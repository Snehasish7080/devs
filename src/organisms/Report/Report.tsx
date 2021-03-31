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

const data: CommentI[] = [
  {
    id: uuidv4(),
    isOwner: false,
    message:
      "Thank you for your submission! We were able to validate your report,  and have submitted it to the appropriate remediation team for review.",
    media: [
      {
        id: uuidv4(),
        content: test,
        name: "FFE8H8",
      },
    ],
  },
  {
    id: uuidv4(),
    isOwner: true,
    message:
      "Thank you for your submission! We were able to validate your report,  and have submitted it to the appropriate remediation team for review.",
    media: [
      {
        id: uuidv4(),
        content: test,
        name: "FFE8I8",
      },
    ],
  },
];

type ReportProps = {
  reportData?: IQueryReport;
};
function Report({ reportData }: ReportProps) {
  const [commentData, setCommentData] = useState(data);
  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      isOwner: false,
      message: "",
      media: [] as MediaI[],
    },
    validationSchema: replyValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      setCommentData([...commentData, values]);
      resetForm({ values: formik.initialValues });
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
  return (
    <div className={styles.reportCard}>
      <div className={styles.reportHeader}>
        <div className={styles.profileInfo}>
          {reportData ? (
            <Avatar className={styles.avatar} />
          ) : (
            <Bone height={"45px"} width={"45px"} rounded={true} />
          )}
          <span>Username</span>
        </div>
        <div className={styles.reputationContainer}>
          <span className={styles.totalReputation}>1170</span>
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
            {commentData.map((item, index) => {
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
