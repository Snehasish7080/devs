import React, { InputHTMLAttributes } from "react";
import Input from "../Input/Input";
import styles from "./CheckBox.module.scss";

export type Props = {} & InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = (props: Props) => {
  const { className = "" } = props;

  return (
    <Input
      {...props}
      className={`${styles.input} ${className}`}
      type="checkbox"
    />
  );
};
