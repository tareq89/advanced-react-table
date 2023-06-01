import style from "../sass/loader.module.sass";

export const Loader = (props: { className?: string; style?: React.CSSProperties }) => {
  return (
    <div className={`${style.ldsSpinner} ${props.className}`} style={props.style}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
