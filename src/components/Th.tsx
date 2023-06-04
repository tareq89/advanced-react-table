import { SortDownIcon } from "../icons/SortDownIcon";
import { SortUpIcon } from "../icons/SortUpIcon";
import { Input } from "./Input";
import { Select } from "./Select";
import { IWindowedTableColumns } from "../interfaces/component/ITableConfig";
import style from "../sass/th.module.sass";

export const Th = (props: {
  column: IWindowedTableColumns;
  onChange: (value: any) => void;
  onClick: () => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  return (
    <div className={style.th} style={{ ...(props.column.columnType !== "data" && { padding: "20px 0px" }) }}>
      <div onClick={() => props.column.columnType === "data" && props.onClick()}>
        <div className={style.title}>{props.column.title}</div>
        {props.column.columnType === "data" && props.column.sortable && (
          <div className={style.sort}>
            <span className={props.sortBy === props.column.fieldName && props.sortOrder === "asc" ? style.active : ""}>
              <SortUpIcon />
            </span>
            <span className={props.sortBy === props.column.fieldName && props.sortOrder === "desc" ? style.active : ""}>
              <SortDownIcon />
            </span>
          </div>
        )}
      </div>

      {props.column.columnType === "data" && (
        <>
          {props.column.filterType === "input" && (
            <Input title={props.column.title || ""} defaultValue={props.column.filterValue} onChange={props.onChange} />
          )}
          {props.column.filterType === "select" && props.column.filterOptions && props.column.filterOptions.length > 0 && (
            <Select defaultValue={props.column.filterValue} filterOptions={props.column.filterOptions} onChange={props.onChange} />
          )}
        </>
      )}
    </div>
  );
};
