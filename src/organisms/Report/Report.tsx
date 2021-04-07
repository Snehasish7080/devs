import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Avatar } from "../../atoms/Avatar/Avatar";
import TextArea from "../../atoms/TextArea/TextArea";
import Comment from "../../molecules/Comment/Comment";
import styles from "./Report.module.scss";
import test from "../../assets/images/test.png";
import { useFormik } from "formik";
import { CommentI } from "../../Interface/CommnetI";
import { MediaI } from "../../Interface/MediaI";
import Button from "../../atoms/Button/Button";
import AddFileInput from "../../molecules/AddFileInput/AddFileInput";
import ImageTag from "../../molecules/ImageTag/ImageTag";
import { replyValidation } from "./Validation";
import Error from "../../molecules/Error/Error";
import { IQueryReport } from "../../Interface/QueryReport";
import { Bone } from "../../atoms/Bone/Bone";
import { postComment } from "../../api/CreateComment";
import { ApiResponse } from "apisauce";
import { useQuery } from "react-query";
import { getComment } from "../../api/GetComment";

type ReportProps = {
  reportData?: IQueryReport;
  comments?: CommentI[];
  commentRefetch?: () => void;
};

function Report({ reportData, comments, commentRefetch }: ReportProps) {
  const formik = useFormik({
    initialValues: {
      // id: uuidv4(),
      isOwner: false,
      message: "",
      media: [] as MediaI[],
      ServerError: "",
    },
    validationSchema: replyValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      createComment();
    },
  });

  const handleAddDocuments = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      const newMedia = Array.from(files).map((file) => ({
        id: uuidv4(),
        name: Math.random().toString(20).substr(2, 6),
        content: URL.createObjectURL(file), // temporary local data url
        // file, // to be uploaded later....
      }));
      formik.setValues((prev) => {
        const media = [...prev.media, ...newMedia];

        return {
          ...prev,
          media,
        };
      });
    }
  };

  const handleRemove = (id: string) => {
    const index = formik.values.media.findIndex((x) => x.id === id);
    if (index > -1) {
      formik.setValues((prev) => {
        prev.media.splice(index, 1);
        return {
          ...prev,
        };
      });
    }
  };

  const createComment = async () => {
    if (reportData?._id) {
      const body = new FormData();

      (formik.values.media || []).map((item, index) => {
        body.append("cImages", item.file as Blob);
      });

      body.append("queryReportId", reportData?._id);
      body.append("text", formik.values.message);

      const response: ApiResponse<any, any> = await postComment(body);

      if (response.data.status) {
        formik.setErrors({
          ServerError: "",
        });
        formik.resetForm();
        if (commentRefetch) {
          commentRefetch();
        }
        formik.setSubmitting(false);
        // history.push(`/query/detail/${response.data.data}`);
      } else {
        formik.setErrors({
          ServerError: response.data.message,
        });
      }
    }
  };

  return (
    <div className={styles.reportCard}>
      <div className={styles.reportHeader}>
        <div className={styles.profileInfo}>
          {reportData ? (
            <Avatar className={styles.avatar} />
          ) : (
            <Bone height={"45px"} width={"45px"} rounded={true} />
          )}
          {reportData ? (
            <span>{reportData?.submittedBy?.username}</span>
          ) : (
            <Bone height={"20px"} width={"100px"} />
          )}
        </div>
        <div className={styles.reputationContainer}>
          {reportData ? (
            <span className={styles.totalReputation}>
              {reportData?.submittedBy?.reputation}
            </span>
          ) : (
            <Bone height={"10px"} />
          )}
          <span className={styles.reputation}>Reputation</span>
        </div>
      </div>
      <div className={styles.titleHeader}>
        <div>
          <span className={styles.reportNo}>#1146</span>
        </div>
        <span className={styles.title}>
          {reportData ? reportData?.title : <Bone height={"20px"} />}
        </span>
      </div>
      <div className={styles.reportInfoContainer}>
        <span className={styles.stateTitle}>State:</span>
        <span className={styles.state}>Open</span>
        <span className={styles.stateTitle}>Reported at:</span>
        <span className={styles.state}>March 6, 2021 5:30am</span>
      </div>

      <div className={styles.explanationContainer}>
        <span className={styles.explanationTitle}>EXPLANATION</span>
        <div className={styles.explanation}>
          {reportData ? (
            <Avatar className={styles.avatar} />
          ) : (
            <Bone height={"45px"} width={"45px"} rounded={true} />
          )}
          <span>
            {reportData ? reportData?.description : <Bone height={"30px"} />}
          </span>
        </div>

        <div className={styles.timeLineContainer}>
          <span className={styles.timelineTitle}>TIMELINE</span>
          <div className={styles.commentContainer}>
            {(comments || []).map((item, index) => {
              return <Comment comment={item} key={index} />;
            })}
          </div>
        </div>
      </div>

      <form noValidate onSubmit={formik.handleSubmit}>
        <div className={styles.textAreaContainer}>
          <span className={styles.replyTitle}>REPLY</span>
          <div className={styles.textareaError}>
            <TextArea
              className={styles.textArea}
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.errors.message && formik.touched.message && (
              <Error>{formik.errors.message}</Error>
            )}
          </div>
          <div className={styles.imageTagContainer}>
            {formik.values.media.map((item, index) => {
              return (
                <ImageTag
                  tagName={item.name as string}
                  onCross={() => handleRemove(item.id)}
                />
              );
            })}
          </div>
          <div className={styles.btnContainer}>
            <AddFileInput onChange={handleAddDocuments} />
            <Button type="submit" className={styles.submitBtn}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Report;
