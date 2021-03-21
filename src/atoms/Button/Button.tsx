import React, { PropsWithChildren } from "react";
import { ButtonProps } from "react-bootstrap";
import styles from "./Button.module.scss";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  PropsWithChildren<{}> &
  ButtonProps;

const Button = ({ children, className = "", ...props }: Props) => {
  return (
    <button
      className={`${styles.buttonBtn} ${className} ${
        props.disabled ? styles.disabled : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
