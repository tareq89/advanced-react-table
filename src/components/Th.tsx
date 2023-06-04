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
    <div className={style.th} style={{ width: `${props.column.width}px` }}>
      <div onClick={props.onClick}>
        <div
          className={style.title}
          style={{ width: `${props.column.width - 30}px`, ...(props.column.fieldName === "index" && { padding: "12px 0px" }) }}
        >
          {props.column.title}
        </div>

        {props.column.sortable && (
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
      <div style={{ width: props.column.width - 50, display: "block", margin: "auto" }}>
        {props.column.filterType === "input" && (
          <Input title={props.column.title || ""} defaultValue={props.column.filterValue} onChange={props.onChange} />
        )}
        {props.column.filterType === "select" && props.column.filterOptions && props.column.filterOptions.length > 0 && (
          <Select defaultValue={props.column.filterValue} filterOptions={props.column.filterOptions} onChange={props.onChange} />
        )}
      </div>
    </div>
  );
};
