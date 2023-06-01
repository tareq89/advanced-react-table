import { useEffect, useRef, useState } from "react";
import { IDataApiQueryParams, IDataApiResponse } from "../interfaces/data/ITableData";
import { Input } from "./Input";
import { Th } from "./Th";
import { LimitSelect } from "./LimitSelect";
import { TotalFound } from "./TotalFound";
import { ThFilter } from "./ThFilter";
import { useInView } from "react-intersection-observer";
import style from "../sass/table.module.sass";
import { Loader } from "./Loader";

export interface ITableColumns {
  title: string;
  filterType?: "input" | "select";
  filterOptions?: { label: string; value: any }[];
  sorting?: boolean;
  fieldName: string;
  sortOrder: number;
  width?: number;
}
export interface ITableProps {
  columns: ITableColumns[];
  dataSource?: { [key: string]: any }[];
  getDataFunc?: (params: IDataApiQueryParams) => Promise<IDataApiResponse>;
  insertRowDataFunc?: (params: { [key: string]: any }) => Promise<IDataApiResponse>;
  updateRowDataFunc?: (params: { [key: string]: any }) => Promise<IDataApiResponse>;
  deleteRowDataFunc?: (id: string) => Promise<IDataApiResponse>;
}
export const Table = (props: ITableProps) => {
  const [dataSource, setDataSource] = useState<{ [key: string]: any }[]>([]);
  const [totalFound, setTotalFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<IDataApiQueryParams>({
    sortOrder: undefined,
    sortBy: undefined,
    start: 0,
    limit: 10,
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadData = (loadFresh?: boolean) => {
    setLoading(true);
    props.getDataFunc &&
      props
        .getDataFunc(queryParams)
        .then((response) => {
          setDataSource(loadFresh ? response.data : [...dataSource, ...response.data]);
          setTotalFound(response.totalFound);
        })
        .finally(() => setLoading(true));
  };

  useEffect(() => {
    if (props.getDataFunc && dataSource?.length < totalFound && inView) {
      setQueryParams({ ...queryParams, start: queryParams.start + queryParams.limit });
    }
  }, [inView]);

  useEffect(() => {
    if (props.dataSource) setDataSource(props.dataSource);
    else if (props.getDataFunc) {
      loadData(!inView);
    }
  }, [props.dataSource, props.getDataFunc, queryParams]);

  return (
    <>
      <div className={style.tableContainer}>
        <div className={style.tableTopControls}>
          <LimitSelect onChange={(value: number) => setQueryParams({ ...queryParams, limit: value })} />
          <TotalFound totalFound={totalFound} start={queryParams.start} limit={queryParams.limit} />
          <Input
            className={style.search}
            title={"Search"}
            onChange={(value) => setQueryParams({ ...queryParams, search: value === "" ? undefined : value })}
          />
        </div>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Index</th>
              {props.columns.map((x, i) => (
                <Th
                  key={i}
                  onClick={() =>
                    setQueryParams({
                      ...queryParams,
                      sortBy: x.fieldName,
                      sortOrder: queryParams.sortOrder === "asc" ? "desc" : "asc",
                    })
                  }
                  column={x}
                  sortBy={queryParams.sortBy}
                  sortOrder={queryParams.sortOrder}
                />
              ))}
            </tr>
            <tr>
              <th></th>
              {props.columns.map((x, i) => (
                <ThFilter
                  key={i}
                  onChange={(value) => setQueryParams({ ...queryParams, start: 0, [x.fieldName]: value === "" ? undefined : value })}
                  filterType={x.filterType}
                  filterOptions={x.filterOptions}
                />
              ))}
            </tr>
          </thead>
          <tbody onScroll={() => {}}>
            {dataSource.map((data, j) => (
              <tr key={j}>
                <td>{j}</td>
                {props.columns.map((column, i) => (
                  <td key={i} style={{ width: `${column.width ? column.width : column.title.length + 120}px` }}>
                    {data[column.fieldName]}
                  </td>
                ))}
              </tr>
            ))}
            <tr ref={ref}>{loading && <Loader className={style.loaderPosition} />}</tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
