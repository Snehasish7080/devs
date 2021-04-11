import { ApiResponse } from "apisauce";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getComment } from "../../api/GetComment";
import { getReportById } from "../../api/ReportById";
import { getReportByUserId } from "../../api/ReportByUser";
import { Bone } from "../../atoms/Bone/Bone";
import { CommentI } from "../../Interface/CommnetI";
import { IQueryReport } from "../../Interface/QueryReport";
import Layout from "../../molecules/Layout/Layout";
import Report from "../../organisms/Report/Report";
import styles from "./UserReports.module.scss";

type allReports = {
  data: IQueryReport[];
};

type Params = {
  id: string;
};

type ReportDetail = {
  data: IQueryReport;
};

type ReportComments = {
  data: CommentI[];
};
function UserReports() {
  const { id } = useParams<Params>();
  const getAllReports = async () => {
    const response: ApiResponse<any, any> = await getReportByUserId();
    return response.data;
  };

  const { data: AllUserReports } = useQuery<allReports>(
    "getAllReport",
    getAllReports
  );

  const getReport = async () => {
    const response: ApiResponse<any, any> = await getReportById(id);
    return response.data;
  };

  const getReportComments = async () => {
    const response: ApiResponse<any, any> = await getComment(id);
    return response.data;
  };

  const {
    data: ReportDetail,
    refetch: reportDetailRefetch,
  } = useQuery<ReportDetail>("getReport", getReport, {
    cacheTime: 0,
  });

  const {
    data: reportComments,
    refetch: commentRefetch,
  } = useQuery<ReportComments>("reportComments", getReportComments, {
    cacheTime: 0,
  });
  return (
    <Layout>
      <section className={styles.userReportsMainContainer}>
        <div>
          <div className={styles.allReportsContainer}>
            <div className={styles.header}>Reports</div>
            <div className={styles.reports}>
              {AllUserReports ? (
                <>
                  {(AllUserReports?.data || []).map((item, index) => {
                    return (
                      <Link to={`/reports/${item._id}`} key={item._id}>
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <Bone height={"20px"} width={"300px"} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.reportDetailContainer}>
          {id && (
            <Report
              reportData={ReportDetail?.data}
              comments={reportComments?.data}
              commentRefetch={commentRefetch}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}

export default UserReports;
