import debounce from "lodash.debounce";
import { CancelIcon } from "../icons/CancelIcon";
import style from "../sass/input.module.sass";
import { useRef } from "react";

export const Input = (props: { title: string; onChange: (value: string) => void; className?: string }) => {
  const first = useRef<HTMLInputElement>(null);
  return (
    <div className={`${style.inputContainer} ${props.className}`}>
      <input placeholder={props.title} ref={first} onChange={debounce((e) => props.onChange(e.target.value), 1 * 1000)} />
      <span
        onClick={() => {
          if (first && first.current) {
            first.current.value = "";
            props.onChange("");
          }
        }}
      >
        <CancelIcon />
      </span>
    </div>
  );
};
