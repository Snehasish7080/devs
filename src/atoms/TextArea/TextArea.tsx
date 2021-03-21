import React from "react";
import styles from "./TextArea.module.scss";

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => (
  <textarea
    ref={ref}
    className={`${styles.textarea} ${props.className}`}
    {...props}
  />
));

export default TextArea;
