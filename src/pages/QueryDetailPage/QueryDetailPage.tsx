import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./QueryDetailPage.module.scss";
import { Avatar } from "../../atoms/Avatar/Avatar";
import Image from "../../atoms/Image/Image";
import test from "../../assets/images/test.png";
import Button from "../../atoms/Button/Button";
import Layout from "../../molecules/Layout/Layout";
import QueryDescription from "./QueryDescription/QueryDescription";
import { Link, Route, useParams } from "react-router-dom";
import QueryReports from "../../molecules/QueryReports/QueryReports";
import { useMutation, useQuery } from "react-query";
import { ApiResponse } from "apisauce";
import { queryDetail } from "../../api/QueryDetail";
import { IQuery } from "../../Interface/Query";
import { IUser } from "../../Interface/User";
import { Bone } from "../../atoms/Bone/Bone";
import { picked } from "../../api/Picked";
import { getReportByQueryId } from "../../api/ReportsByQId";
import { IQueryReport } from "../../Interface/QueryReport";

const queries = [
  {
    _id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    _id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    _id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    _id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    _id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
];

const QueryDetailRouts = [
  {
    component: QueryDescription,
    routeName: "detail",
    routeTitle: "Description",
  },
  {
    component: QueryReports,
    routeName: "reports",
    routeTitle: "Reports",
  },
];

type Params = {
  section: string;
  id: string;
};

type QueryDetailData = {
  data: IQuery;
};

type QueryReports = {
  data: IQueryReport[];
};

interface State {
  QueryDetail: QueryDetailData | undefined;
}

const defaultState: State = {
  QueryDetail: undefined,
};

export const QueryDetailContext = createContext<State>(defaultState);

function QueryDetailPage() {
  const { section, id } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState(section);

  const getQueryDetail = async () => {
    const response: ApiResponse<any, any> = await queryDetail(id);
    return response.data;
  };

  const getQueryReports = async () => {
    const response: ApiResponse<any, any> = await getReportByQueryId(id);
    return response.data;
  };

  // const pickedQuery = async () => {
  //   const response: ApiResponse<any, any> = await picked(id);
  //   return response.data;
  // };

  const { data: QueryDetail } = useQuery<QueryDetailData>(
    "queryDetail",
    getQueryDetail,
    {
      cacheTime: 0,
    }
  );

  const { data: QueryReports } = useQuery<QueryReports>(
    "queryReports",
    getQueryReports,
    {
      cacheTime: 0,
    }
  );

  const pickedQueryMutation = useMutation((queryId: string) => picked(queryId));

  const state: State = {
    QueryDetail: QueryDetail,
  };

  return (
    <Layout className={styles.queriesDetailMainContainer}>
      <div className={styles.queryDetailOuterContainer}>
        <div className={styles.queryDetailContainer}>
          <div className={styles.topContainer}>
            {QueryDetail ? (
              <Link to={`/profile/${QueryDetail.data.postedBy.username}`}>
                <Avatar />
              </Link>
            ) : (
              <Bone height={"60px"} width={"60px"} rounded={true} />
            )}
            <div className={styles.basicInfoContainer}>
              <span className={styles.queryTitle}>
                {QueryDetail ? (
                  QueryDetail?.data.title
                ) : (
                  <Bone height={"18px"} />
                )}
              </span>
              {QueryDetail ? (
                <span className={styles.price}>
                  ${QueryDetail?.data.amount}
                </span>
              ) : (
                <Bone height={"16px"} />
              )}
            </div>
            <div className={styles.btnContainer}>
              <Link to={`/submit/${id}`}>
                <Button className={styles.reportBtn}>Submit report</Button>
              </Link>
              <Button
                className={styles.pickBtn}
                onClick={() => pickedQueryMutation.mutate(id)}
              >
                Pick Query
              </Button>
            </div>

            <div className={styles.separator} />
            <span className={styles.queryTime}>30 min ago</span>
          </div>
          <div className={styles.tabContainer}>
            {QueryDetailRouts.map((item, index) => {
              return (
                <Link to={`/query/${item.routeName}/${id}`}>
                  <div
                    className={
                      selectedTab === item.routeName
                        ? `${styles.tabs} ${styles.selected}`
                        : styles.tabs
                    }
                    key={index}
                    onClick={() => setSelectedTab(item.routeName)}
                  >
                    <span>{item.routeTitle}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <QueryDetailContext.Provider value={state}>
            {QueryDetailRouts.map((item, index) => {
              return (
                <Route
                  exact
                  path={`/query/${item.routeName}/:id`}
                  component={
                    item.routeName === "reports"
                      ? () => <item.component queries={QueryReports?.data} />
                      : item.component
                  }
                  key={index}
                />
              );
            })}
          </QueryDetailContext.Provider>
        </div>
        <div className={styles.queryDetailInfoContainer}>
          <div className={styles.queryDetailInfo}>
            <div className={styles.header}>Response Efficiency</div>
            <div className={styles.responseTime}>
              {QueryDetail ? (
                `${QueryDetail?.data.responseTime} hrs`
              ) : (
                <Bone height={"20px"} maxWidth={"50%"} />
              )}
              <span>Average time to first response</span>
            </div>
            <div className={styles.responseTime}>
              {QueryDetail ? (
                `${QueryDetail?.data.triageTime || 1} hrs`
              ) : (
                <Bone height={"20px"} maxWidth={"50%"} />
              )}
              <span>Average time to triage</span>
            </div>
          </div>
          <div className={styles.queryDetailInfo}>
            <div className={styles.header}>Current Holders</div>

            {QueryDetail ? (
              <>
                {(QueryDetail?.data.pickedBy || []).map((item, index) => {
                  return (
                    <div className={styles.userInfoContainer} key={index}>
                      <Avatar className={styles.avatar} />
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{item.username}</span>
                        <span className={styles.reputation}>
                          reputation: {item.reputation}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className={styles.userInfoContainer}>
                <Bone height={"45px"} width={"45px"} rounded={true} />
                <div className={styles.userInfo}>
                  <Bone height={"15px"} />
                  <span className={styles.reputation}>
                    <Bone height={"15px"} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueryDetailPage;
