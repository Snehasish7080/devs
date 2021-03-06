import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Bone } from "../../atoms/Bone/Bone";
import styles from "./QueriesCard.module.scss";

type QueriesCardProps = {
  id?: string;
  title?: string;
  description?: string;
  userName?: string;
};
function QueriesCard({ id, title, description, userName }: QueriesCardProps) {
  return (
    <div className={styles.queriesContainer}>
      <div className={styles.userProfileImageContainer}>
        {id ? (
          <Link to={`/user/${userName}`}>
            <Avatar />
          </Link>
        ) : (
          <Bone height={"60px"} width={"60px"} rounded={true} />
        )}
      </div>
      <div className={styles.queryInfoContainer}>
        <Link to={id ? `/query/detail/${id}` : "#"}>
          <div className={styles.queryTitle}>
            {title ? title : <Bone height={"30px"} width={"100%"} />}
          </div>
          <div className={styles.queryDesc}>
            {description ? (
              `${description}`.substring(0, 300) + "..."
            ) : (
              <Bone height={"55px"} width={"100%"} />
            )}
          </div>
        </Link>
      </div>
      <div className={styles.priceContainer}>
        {id ? "$100" : <Bone height={"20px"} width={"100%"} />}
      </div>
    </div>
  );
}

export default QueriesCard;
