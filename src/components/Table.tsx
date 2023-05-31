import { useEffect, useState } from "react";
import { IDataApiQueryParams, IDataApiResponse } from "../interfaces/data/ITableData";
import style from "../sass/table.module.sass";
import { SortUpIcon } from "../icons/SortUpIcon";
import { SortDownIcon } from "../icons/SortDownIcon";
import { Input } from "./Input";

export interface ITableColumns {
  title: string;
  filterType?: "input" | "select";
  filterOption?: { label: string; value: any }[];
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
  const [queryParams, setQueryParams] = useState<IDataApiQueryParams>({
    sortOrder: undefined,
    sortyBy: undefined,
    start: 0,
    limit: 10,
  });
  const [count, setCount] = useState<{ currentCount: number; totalCount: number }>({ currentCount: 0, totalCount: 0 });
  useEffect(() => {
    if (props.dataSource) setDataSource(props.dataSource);
    else if (props.getDataFunc) {
      props.getDataFunc(queryParams).then((response) => {
        setDataSource(response.data);
        setCount(response);
      });
    }
  }, [props.dataSource, props.getDataFunc, queryParams]);

  return (
    <table className={style.table}>
      <thead>
        <tr>
          {props.columns.map((x, i) => (
            <th
              key={i}
              style={{ width: `${x.width ? x.width : x.title.length + 120}px` }}
              onClick={() => {
                setQueryParams({ ...queryParams, sortyBy: x.fieldName, sortOrder: queryParams.sortOrder === "asc" ? "desc" : "asc" });
              }}
            >
              <div>
                <span className={style.title} style={{ width: `${x.width ? x.width : x.title.length + 100}px` }}>
                  {x.title}
                </span>
                <div className={style.sort}>
                  <span className={queryParams.sortyBy === x.fieldName && queryParams.sortOrder === "asc" ? style.active : ""}>
                    <SortUpIcon />
                  </span>
                  <span className={queryParams.sortyBy === x.fieldName && queryParams.sortOrder === "desc" ? style.active : ""}>
                    <SortDownIcon />
                  </span>
                </div>
              </div>
            </th>
          ))}
        </tr>
        <tr>
          {props.columns.map((x, i) => (
            <th key={i}>
              {x.filterType && (
                <>
                  {x.filterType === "input" && (
                    <Input
                      title={x.title}
                      onChange={(value) => setQueryParams({ ...queryParams, [x.fieldName]: value === "" ? undefined : value })}
                    />
                  )}
                  {x.filterType === "select" && x.filterOption && x.filterOption.length > 0 && (
                    <select>
                      {x.filterOption.map((option, j) => (
                        <option key={j} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}
            </th>
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
  );
};
