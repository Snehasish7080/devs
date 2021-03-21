import React, { ReactNode } from "react";
import styles from "./Layout.module.scss";
import { Container } from "react-bootstrap";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};
function Layout({ children, className }: LayoutProps) {
  return (
    <Container className={`${styles.layout} ${className}`}>
      {children}
    </Container>
  );
}

export default Layout;
