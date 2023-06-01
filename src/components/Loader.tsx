import style from "../sass/loader.module.sass";

export const Loader = (props: { className?: string }) => {
  return (
    <div className={`${style.ldsSpinner} ${props.className}`}>
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
