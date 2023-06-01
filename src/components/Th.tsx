import React from "react";
import { SortDownIcon } from "../icons/SortDownIcon";
import { SortUpIcon } from "../icons/SortUpIcon";
import style from "../sass/th.module.sass";
import { IWindowedTableColumns } from "./WindowedTable";
import { Input } from "./Input";
import { Select } from "./Select";

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
        <span
          className={style.title}
          style={{ width: `${props.column.width - 30}px`, ...(props.column.fieldName === "index" && { padding: "12px 0px" }) }}
        >
          {props.column.title}
        </span>

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
      <div>
        {props.column.filterType === "input" && (
          <Input style={{ width: props.column.width - 50 }} title={props.column.title || ""} onChange={props.onChange} />
        )}
        {props.column.filterType === "select" && props.column.filterOptions && props.column.filterOptions.length > 0 && (
          <Select style={{ width: props.column.width - 50 }} filterOptions={props.column.filterOptions} onChange={props.onChange} />
        )}
      </div>
    </div>
  );
};
