import React from "react";
import { Input } from "./Input";
import { Select } from "./Select";

export const ThFilter = (props: {
  filterType?: "input" | "select";
  title?: string;
  filterOptions?: { label: string; value: any }[];
  onChange: (value: any) => void;
}) => {
  return (
    <th>
      {props.filterType === "input" && <Input title={props.title || ""} onChange={props.onChange} />}
      {props.filterType === "select" && props.filterOptions && props.filterOptions.length > 0 && (
        <Select filterOptions={props.filterOptions} onChange={props.onChange} />
      )}
    </th>
  );
};
