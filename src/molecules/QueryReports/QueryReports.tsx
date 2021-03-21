import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { IQueryReport } from "../../Interface/QueryReport";
import styles from "./QueryReports.module.scss";

const data = [1, 2, 3, 4, 5, 6, 7, 8];

type QueryReportsProps = {
  queries: IQueryReport[];
};

function QueryReports({ queries }: QueryReportsProps) {
  return (
    <div className={styles.reportContainer}>
      <div className={styles.header}>Reports</div>
      {queries.map((item, index) => {
        return (
          <div className={styles.reports}>
            <Avatar className={styles.avatar} />
            <div className={styles.userInfo}>
              <Link to={"/report/:id"}>
                <span className={styles.title}>{item?.title}</span>
              </Link>
              {item?.name && (
                <div className={styles.username}>
                  By <Link to="#">UserName</Link>
                </div>
              )}
              {item?.price && (
                <div className={styles.username}>{item?.price}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QueryReports;
