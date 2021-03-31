import React from "react";
import styles from "./ReportPage.module.scss";
import Layout from "../../molecules/Layout/Layout";
import Report from "../../organisms/Report/Report";
import { getReportById } from "../../api/ReportById";
import { ApiResponse } from "apisauce";
import { useParams } from "react-router";
import { useQuery } from "react-query";

type Params = {
  id: string;
};
function ReportPage() {
  const { id } = useParams<Params>();
  const getReport = async () => {
    const response: ApiResponse<any, any> = await getReportById(id);
    return response.data;
  };

  const { data: ReportDetail } = useQuery("getReport", getReport, {
    cacheTime: 0,
  });

  // console.log(ReportDetail);

  return (
    <Layout className={styles.reportContainer}>
      <Report />
    </Layout>
  );
}

export default ReportPage;
