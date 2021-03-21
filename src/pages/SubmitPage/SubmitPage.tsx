import React from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import Button from "../../atoms/Button/Button";
import TextArea from "../../atoms/TextArea/TextArea";
import AddFileInput from "../../molecules/AddFileInput/AddFileInput";
import Layout from "../../molecules/Layout/Layout";
import styles from "./SubmitPage.module.scss";
import { MediaI } from "../../Interface/MediaI";
import ImageTag from "../../molecules/ImageTag/ImageTag";
import { reportValidation } from "./Validation";
import Error from "../../molecules/Error/Error";

function SubmitPage() {
  const formik = useFormik({
    initialValues: {
      report: "",
      media: [] as MediaI[],
    },
    validationSchema: reportValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      //   setCommentData([...commentData, values]);
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
    <Layout>
      <div className={styles.submitContainer}>
        <div className={styles.header}>Submit Report</div>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className={styles.inputContainer}>
            <div>
              <TextArea
                className={styles.textArea}
                name="report"
                placeholder="Make a Quality Explanation with media files."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.report}
              />
              {formik.touched.report && formik.errors.report && (
                <Error>{formik.errors.report}</Error>
              )}
            </div>

            <div className={styles.imageTagContainer}>
              {formik.values.media.map((item, index) => {
                return (
                  <ImageTag
                    tagName={item.name as string}
                    onCross={() => handleRemove(item.id)}
                    key={index}
                  />
                );
              })}
            </div>
            <div className={styles.btnContainer}>
              <AddFileInput onChange={handleAddDocuments} />
              <Button className={styles.submit}>Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default SubmitPage;
