import React from "react";
import { Avatar } from "../../atoms/Avatar/Avatar";
import Image from "../../atoms/Image/Image";
import styles from "./Comment.module.scss";
import test from "../../assets/images/test.png";
import { CommentI } from "../../Interface/CommnetI";

type CommentProps = {
  comment: CommentI;
};

function Comment({ comment }: CommentProps) {
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
          <span className={styles.username}>UserName</span>
          <span
            className={
              comment.isOwner
                ? `${styles.userRole}`
                : `${styles.userRole} ${styles.reporter}`
            }
          >
            {comment.isOwner ? "Quey Owner" : "Reporter"}
          </span>
        </div>
        <span className={styles.comment}>{comment.message}</span>
        <div className={styles.mediaContainer}>
          {comment.media.map(({ id, content, name }) => {
            return (
              <div className={styles.mediaBoxContainer}>
                <div className={styles.header}>
                  <span>{name}</span>
                </div>
                <div className={styles.mediaBox} key={id}>
                  <Image src={content} />
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
