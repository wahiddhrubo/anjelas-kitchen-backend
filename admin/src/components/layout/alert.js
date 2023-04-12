import style from "./Alert.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { closeAlert, triggerAlert } from "../../redux/slice/alert.js";

export default function Alert() {
  const dispatch = useDispatch();
  const { type, message, show } = useSelector((state) => state.alert);
  console.log({ type, message, show });
  const showClassname = show ? "" : style.hide;
  const defaultTypes = [
    "info",
    "success",
    "error",
    "warning",
    "primary",
    "secondary",
  ];

  const handleClose = (e) => {
    e.preventDefault();
    // dispatch(closeAlert([]));
    dispatch(triggerAlert([]));
  };

  return (
    <div className={showClassname}>
      {defaultTypes.includes(type) && (
        <div className={style.alert + " " + style[type]}>
          <span className={style.closebtn} onClick={handleClose}>
            &times;
          </span>
          {message}
        </div>
      )}
    </div>
  );
}
