import React from "react";
import styles from "./ReportPage.module.scss";
import Layout from "../../molecules/Layout/Layout";
import Report from "../../organisms/Report/Report";

function ReportPage() {
  return (
    <Layout className={styles.reportContainer}>
      <Report />
    </Layout>
  );
}

export default ReportPage;
