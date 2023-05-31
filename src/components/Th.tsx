import React from "react";
import { SortDownIcon } from "../icons/SortDownIcon";
import { SortUpIcon } from "../icons/SortUpIcon";
import { ITableColumns } from "./Table";
import style from "../sass/th.module.sass";

export const Th = (props: { column: ITableColumns; onClick: () => void; sortBy?: string; sortOrder?: "asc" | "desc" }) => {
  return (
    <th
      className={style.th}
      style={{ width: `${props.column.width ? props.column.width : props.column.title.length + 120}px` }}
      onClick={props.onClick}
    >
      <div>
        <span className={style.title} style={{ width: `${props.column.width ? props.column.width : props.column.title.length + 100}px` }}>
          {props.column.title}
        </span>
        <div className={style.sort}>
          <span className={props.sortBy === props.column.fieldName && props.sortOrder === "asc" ? style.active : ""}>
            <SortUpIcon />
          </span>
          <span className={props.sortBy === props.column.fieldName && props.sortOrder === "desc" ? style.active : ""}>
            <SortDownIcon />
          </span>
        </div>
      </div>
    </th>
  );
};
