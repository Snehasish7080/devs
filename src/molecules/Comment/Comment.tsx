import React from "react";
import { Avatar } from "../../atoms/Avatar/Avatar";
import Image from "../../atoms/Image/Image";
import styles from "./Comment.module.scss";
import test from "../../assets/images/test.png";
import { CommentI } from "../../Interface/CommnetI";

type CommentProps = {
  comment: CommentI;
  isOwner?: boolean;
};

function Comment({ comment, isOwner }: CommentProps) {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.profileContainer}>
        <Avatar className={styles.avatar} />
        <div className={styles.separatorContainer}>
          <div className={styles.separator} />
        </div>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.userInfo}>
          <span className={styles.username}>
            {comment.commentedBy.username}
          </span>
          <span
            className={
              isOwner
                ? `${styles.userRole}`
                : `${styles.userRole} ${styles.reporter}`
            }
          >
            {isOwner ? "Quey Owner" : "Reporter"}
          </span>
        </div>
        <span className={styles.comment}>{comment.text}</span>
        <div className={styles.mediaContainer}>
          {(comment.mediaId?.cImages || []).map((item, index) => {
            return (
              <div className={styles.mediaBoxContainer}>
                <div className={styles.header}>
                  <span>FFF89T</span>
                </div>
                <div className={styles.mediaBox} key={index}>
                  <Image src={process.env.REACT_APP_Image_URL + item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comment;
