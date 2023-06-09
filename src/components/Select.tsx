import style from "../sass/select.module.sass";

export const Select = (props: {
  defaultValue?: any;
  style?: React.CSSProperties;
  filterOptions: { label: string; value: any }[];
  onChange: (value: any) => void;
}) => {
  return (
    <div className={style.selectContainer}>
      <select
        defaultValue={props.defaultValue}
        style={props.style}
        onChange={(e) => {
          console.log(e);
          props.onChange(e.target.value);
        }}
      >
        <option value={""}>Select</option>
        {props.filterOptions.map((option, j) => (
          <option key={j} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
