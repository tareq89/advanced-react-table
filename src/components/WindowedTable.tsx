import { Column, Table } from "react-virtualized";
import { IDataApiQueryParams, IDataApiResponse } from "../interfaces/data/ITableData";
import { useState, useEffect } from "react";
import { Th } from "./Th";
import { Loader } from "./Loader";
import style from "../sass/windowedTable.module.sass";
import "react-virtualized/styles.css";
import * as Sentry from "@sentry/react";
export interface IWindowedTableColumns {
  title: string;
  filterType?: "input" | "select";
  filterOptions?: { label: string; value: any }[];
  fieldName: string;
  sortable: boolean;
  sortOrder: number;
  width: number;
}

export interface IWindowedTableProps {
  columns: IWindowedTableColumns[];
  dataSource?: { [key: string]: any }[];
  getDataFunc?: (params: IDataApiQueryParams) => Promise<IDataApiResponse>;
  insertRowDataFunc?: (params: { [key: string]: any }) => Promise<IDataApiResponse>;
  updateRowDataFunc?: (params: { [key: string]: any }) => Promise<IDataApiResponse>;
  deleteRowDataFunc?: (id: string) => Promise<IDataApiResponse>;
}

export const WindowedTable = (props: IWindowedTableProps) => {
  const [dataSource, setDataSource] = useState<{ [key: string]: any }[]>([]);
  const [totalFound, setTotalFound] = useState(0);
  const [loadingType, setLoadingType] = useState<"FRESH" | "PAGINATION">("FRESH");
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<IDataApiQueryParams>({
    sortOrder: undefined,
    sortBy: undefined,
    start: 0,
    limit: 30,
  });

  useEffect(() => {
    if (props.getDataFunc && loadingType === "PAGINATION") {
      setQueryParams({ ...queryParams, start: queryParams.start + queryParams.limit });
    }
  }, [loadingType]);

  useEffect(() => {
    if (props.dataSource) setDataSource(props.dataSource);
    else if (props.getDataFunc) {
      setLoading(true);
      props
        .getDataFunc(queryParams)
        .then((response) => {
          setDataSource(loadingType === "FRESH" ? response.data : [...dataSource, ...response.data]);
          setTotalFound(response.totalFound);
        })
        .finally(() => {
          setLoadingType("FRESH");
          setLoading(false);
        });
    }
  }, [props.dataSource, props.getDataFunc, queryParams]);
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <div className={style.tableContainer}>
        {loading && <Loader className={style.loader} />}
        <Table
          className={style.table}
          style={{ ...(loading && { pointerEvents: "none" }) }}
          width={props.columns.reduce((acc, curr) => acc + curr.width, 0)}
          height={600}
          headerHeight={70}
          rowHeight={30}
          rowCount={dataSource.length}
          rowGetter={({ index }: { index: number }) => dataSource[index]}
          overscanRowCount={queryParams.limit}
          onScroll={(params) => {
            if (params.scrollHeight - params.clientHeight === params.scrollTop && dataSource?.length < totalFound)
              setLoadingType("PAGINATION");
          }}
        >
          {props.columns.map((column, index) => (
            <Column
              key={index}
              cellRenderer={(param) => {
                return param.dataKey === "index" ? param.rowIndex + 1 : param.cellData;
              }}
              headerStyle={{ border: "1px solid" }}
              label={column.title}
              dataKey={column.fieldName}
              width={column.width}
              headerRenderer={(params) => {
                return (
                  <Th
                    onClick={() => {
                      if (queryParams.sortOrder === "asc") setQueryParams({ ...queryParams, sortBy: column.fieldName, sortOrder: "desc" });
                      else if (queryParams.sortOrder === "desc")
                        setQueryParams({ ...queryParams, sortBy: undefined, sortOrder: undefined });
                      else if (queryParams.sortOrder === undefined)
                        setQueryParams({ ...queryParams, sortBy: column.fieldName, sortOrder: "asc" });
                    }}
                    onChange={(value: any) =>
                      setQueryParams({ ...queryParams, start: 0, [column.fieldName]: value === "" ? undefined : value })
                    }
                    sortBy={queryParams.sortBy}
                    sortOrder={queryParams.sortOrder}
                    column={column}
                  />
                );
              }}
            />
          ))}
        </Table>
      </div>
    </Sentry.ErrorBoundary>
  );
};
