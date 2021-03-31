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
import { useParams } from "react-router";
import Input from "../../atoms/Input/Input";
import { createReport } from "../../api/CreateReport";
import { ApiResponse } from "apisauce";

type Params = {
  id: string;
};

function SubmitPage() {
  const { id } = useParams<Params>();

  const formik = useFormik({
    initialValues: {
      title: "",
      report: "",
      media: [] as MediaI[],
      ServerError: "",
    },
    validationSchema: reportValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      //   setCommentData([...commentData, values]);
      submitReport();
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

  const submitReport = async () => {
    const body = new FormData();

    (formik.values.media || []).map((item, index) => {
      body.append("qImages", item.file as Blob);
    });

    body.append("queryId", id);
    body.append("title", formik.values.title);
    body.append("description", formik.values.report);

    const response: ApiResponse<any, any> = await createReport(body);

    if (response.data.status) {
      formik.setErrors({
        ServerError: "",
      });
      formik.resetForm();
      // history.push(`/query/detail/${response.data.data}`);
    } else {
      formik.setErrors({
        ServerError: response.data.message,
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
              <Input
                name="title"
                className={styles.input}
                placeholder="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <Error>{formik.errors.title}</Error>
              )}
            </div>
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
            <div className={styles.serverError}>
              {formik.errors.ServerError && (
                <Error>{formik.errors.ServerError}</Error>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default SubmitPage;
