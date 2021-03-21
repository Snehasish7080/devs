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
import { useQuery } from "react-query";
import { ApiResponse } from "apisauce";
import { queryDetail } from "../../api/QueryDetail";
import { IQuery } from "../../Interface/Query";
import { IUser } from "../../Interface/User";
import { Bone } from "../../atoms/Bone/Bone";

const queries = [
  {
    id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    name: "Username",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
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
  data: IQuery & {
    postedBy: IUser;
    pickedBy: IUser;
    answeredBy: IUser;
  };
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

  const { data: QueryDetail } = useQuery<QueryDetailData>(
    "queryDetail",
    getQueryDetail,
    {
      cacheTime: 0,
    }
  );

  const state: State = {
    QueryDetail: QueryDetail,
  };

  return (
    <Layout className={styles.queriesDetailMainContainer}>
      <div className={styles.queryDetailOuterContainer}>
        <div className={styles.queryDetailContainer}>
          <div className={styles.topContainer}>
            {QueryDetail ? (
              <Avatar />
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
            <Link to="/submit">
              <Button>Submit report</Button>
            </Link>

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
                      ? () => <item.component queries={queries} />
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
              7 hrs
              <span>Average time to triage</span>
            </div>
          </div>
          <div className={styles.queryDetailInfo}>
            <div className={styles.header}>Current Holders</div>
            <div className={styles.userInfoContainer}>
              <Avatar className={styles.avatar} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>UserName</span>
                <span className={styles.reputation}>reputation: 100</span>
              </div>
            </div>
            <div className={styles.userInfoContainer}>
              <Avatar className={styles.avatar} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>UserName</span>
                <span className={styles.reputation}>reputation: 300</span>
              </div>
            </div>

            <div className={styles.userInfoContainer}>
              <Avatar className={styles.avatar} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>UserName</span>
                <span className={styles.reputation}>reputation: 160</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueryDetailPage;