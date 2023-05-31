import React from "react";

export const LimitSelect = (props: { onChange: (value: number) => void }) => {
  return (
    <p>
      Show{" "}
      <select onChange={(e) => props.onChange(Number(e.target.value))}>
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>{" "}
      entries
    </p>
  );
};
