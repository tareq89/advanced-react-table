import { useEffect, useState } from "react";
import { IDataApiQueryParams, IDataApiResponse } from "../interfaces/data/ITableData";
import style from "../sass/table.module.sass";
import { SortUpIcon } from "../icons/SortUpIcon";
import { SortDownIcon } from "../icons/SortDownIcon";
import { Input } from "./Input";
import { Select } from "./Select";
import { Th } from "./Th";
import { LimitSelect } from "./LimitSelect";
import { count } from "console";
import { TotalFound } from "./TotalFound";
import { ThFilter } from "./ThFilter";

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
  const [queryParams, setQueryParams] = useState<IDataApiQueryParams>({
    sortOrder: undefined,
    sortBy: undefined,
    start: 0,
    limit: 10,
  });
  useEffect(() => {
    if (props.dataSource) setDataSource(props.dataSource);
    else if (props.getDataFunc) {
      props.getDataFunc(queryParams).then((response) => {
        setDataSource(response.data);
        setTotalFound(response.totalFound);
      });
    }
  }, [props.dataSource, props.getDataFunc, queryParams]);

  return (
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
        <tbody>
          {dataSource.map((data, j) => (
            <tr key={j}>
              {props.columns.map((column, i) => (
                <td key={i} style={{ width: `${column.width ? column.width : column.title.length + 120}px` }}>
                  {data[column.fieldName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
