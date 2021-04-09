import React, { useContext } from "react";
import styles from "./QueryDescription.module.scss";
import Image from "../../../atoms/Image/Image";
import test from "../../../assets/images/test.png";
import { QueryDetailContext } from "../QueryDetailPage";
import { Bone } from "../../../atoms/Bone/Bone";

function QueryDescription() {
  const { QueryDetail } = useContext(QueryDetailContext);
  return (
    <div className={styles.bottomContainer}>
      <div className={styles.header}>Description</div>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>
          {QueryDetail ? (
            QueryDetail?.data.description
          ) : (
            <Bone height={"100px"} width={"100%"} />
          )}
        </p>
      </div>

      <div className={styles.imageContainer}>
        {QueryDetail ? (
          <>
            {(QueryDetail?.data.mediaID?.qImages || []).map((item, index) => {
              return (
                <div className={styles.image} key={index}>
                  <Image src={item} />
                </div>
              );
            })}
          </>
        ) : (
          new Array(1).fill(
            <div className={styles.image}>
              <Bone height={"150px"} width={"100%"} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default QueryDescription;
