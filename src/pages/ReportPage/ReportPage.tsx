import React from "react";
import styles from "./ReportPage.module.scss";
import Layout from "../../molecules/Layout/Layout";
import Report from "../../organisms/Report/Report";
import { getReportById } from "../../api/ReportById";
import { ApiResponse } from "apisauce";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { IQueryReport } from "../../Interface/QueryReport";

type Params = {
  id: string;
};

type ReportDetail = {
  data: IQueryReport;
};
function ReportPage() {
  const { id } = useParams<Params>();
  const getReport = async () => {
    const response: ApiResponse<any, any> = await getReportById(id);
    return response.data;
  };

  const { data: ReportDetail } = useQuery<ReportDetail>(
    "getReport",
    getReport,
    {
      cacheTime: 0,
    }
  );

  return (
    <Layout className={styles.reportContainer}>
      <Report reportData={ReportDetail?.data} />
    </Layout>
  );
}

export default ReportPage;
