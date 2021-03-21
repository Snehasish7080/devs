import React from "react";
import styles from "./Input.module.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    ref={ref}
    className={` ${styles.input} ${props.className}`}
    {...props}
  />
));

export default Input;
