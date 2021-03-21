import React, { ReactNode } from "react";
import styles from "./Error.module.scss";
type ErrorProps = {
  children?: ReactNode;
};
function Error({ children }: ErrorProps) {
  return (
    <div className={styles.error}>
      <span>{children}</span>
    </div>
  );
}

export default Error;
