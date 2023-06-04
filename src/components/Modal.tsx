import React from "react";
import ReactDOM from "react-dom";
import style from "../sass/modal.module.sass";
import { Loader } from "./Loader";
import { CancelIcon } from "../icons/CancelIcon";

export const Modal = (props: {
  title: React.ReactNode;
  className?: string;
  onClose?: () => void;
  width?: number;
  loading?: boolean;
  children: React.ReactNode;
  level?: 1 | 2;
}) => {
  let modalContainerName = "modal-container";
  if (props.level === 2) modalContainerName = "modal-container-2";
  return ReactDOM.createPortal(
    <div className={`${style.modal}`}>
      <div className={`${style.modalContent} ${props.className}`} style={{ width: `${props.width || 50}%` }}>
        {props.loading && <Loader className={style.spinner} />}
        <div className={style.modalHeader}>
          <h1>{props.title}</h1>
          {props.onClose && (
            <button className={style.close} onClick={props.onClose}>
              <CancelIcon style={{ width: "20px", height: "20px" }} />
            </button>
          )}
        </div>
        {props.children}
      </div>
    </div>,
    document.getElementById(modalContainerName) as HTMLElement
  );
};
