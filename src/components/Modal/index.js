import "./style.scss";
import CloseIcon from "assets/x.svg";
import classNames from "classnames";
import { useState } from "react";

function Modal(props) {

  return (
    <>
      <div className={classNames({
          'modal-bg': true,
          'open': props.open
      })}></div>

      <div className={classNames({
          'modal': true,
          'open': props.open
      })}>
        <img src={CloseIcon} alt="" className="icon close-icon" onClick={props.closeHandler} />

        {props.children}
      </div>
    </>
  );
}

export default Modal;
