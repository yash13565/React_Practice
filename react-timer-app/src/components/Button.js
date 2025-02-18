import React from "react";
import style from "./Button.module.css";
const Button = ({ onClick, text }) => {
  return (
    <button className={style.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
