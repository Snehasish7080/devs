import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./PostQueryPage.module.scss";
import Layout from "../../molecules/Layout/Layout";
import Input from "../../atoms/Input/Input";
import TextArea from "../../atoms/TextArea/TextArea";
import AddFileInput from "../../molecules/AddFileInput/AddFileInput";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import { MediaI } from "../../Interface/MediaI";
import ImageTag from "../../molecules/ImageTag/ImageTag";
import { postQueryValidation } from "./Validation";
import Error from "../../molecules/Error/Error";
import Filter from "../../molecules/Filter/Filter";
import { IFilter } from "../../Interface/Filter";
import { ApiResponse } from "apisauce";
import { category } from "../../api/Category";
import { useQuery } from "react-query";
import { postQuery } from "../../api/PostQuery";
import { useHistory } from "react-router-dom";
import Loader from "../../atoms/Loader/Loader";

function PostQueryPage() {
  const history = useHistory();
  const getAllCategory = async () => {
    const response: ApiResponse<any, any> = await category();
    return response.data;
  };
  const { data } = useQuery<IFilter[]>("category", getAllCategory, {
    refetchOnWindowFocus: false,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      averageResTime: "",
      averageTriageTime: "",
      description: "",
      media: [] as MediaI[],
      techs: [] as IFilter[],
      ServerError: "",
    },
    validationSchema: postQueryValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      post();
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
        file, // to be uploaded later....
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

  const checkBoxChange = (value: IFilter) => {
    formik.setValues((prev) => {
      const techs = [...prev.techs];
      const idIndex = techs.findIndex((x) => x._id === value._id);
      if (idIndex >= 0) {
        techs.splice(idIndex, 1);
      } else if (idIndex === -1) {
        techs.push(value);
      }
      return {
        ...prev,
        techs,
      };
    });
  };

  const post = async () => {
    const body = new FormData();

    (formik.values.media || []).map((item, index) => {
      body.append("qImages", item.file as Blob);
    });
    (formik.values.techs || []).map((item, index) => {
      body.append("categoryID", item._id);
    });

    body.append("title", formik.values.title);
    body.append("description", formik.values.description);
    body.append("amount", formik.values.amount);
    body.append("responseTime", formik.values.averageResTime);
    body.append("triageTime", formik.values.averageTriageTime);
    body.append("status", "Open");

    const response: ApiResponse<any, any> = await postQuery(body);

    if (response.data.status) {
      formik.setErrors({
        ServerError: "",
      });
      formik.resetForm();
      formik.setSubmitting(false);
      history.push(`/query/detail/${response.data.data}`);
    } else {
      formik.setErrors({
        ServerError: response.data.message,
      });
    }
  };

  if (formik.isSubmitting) {
    return <Loader />;
  } else {
    return (
      <Layout>
        <div className={styles.postQueryMainContainer}>
          <div>
            <Filter
              filters={data || []}
              title="Technology"
              onCheckBoxChange={checkBoxChange}
            />
          </div>
          <div className={styles.postQueryContainer}>
            <div className={styles.header}>Post Query</div>
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className={styles.inputContainer}>
                <div className={styles.titleInput}>
                  <div className={styles.label}>Title</div>
                  <Input
                    className={styles.input}
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.errors.title && formik.touched.title && (
                    <Error>{formik.errors.title}</Error>
                  )}
                </div>

                <div className={styles.infoInput}>
                  <div className={styles.titleInput}>
                    <div className={styles.label}>
                      Amount
                      <span>(in USD)</span>
                    </div>
                    <Input
                      className={styles.input}
                      name="amount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                    />
                    {formik.errors.amount && formik.touched.amount && (
                      <Error>{formik.errors.amount}</Error>
                    )}
                  </div>
                  <div className={styles.titleInput}>
                    <div className={styles.label}>
                      Average Response Time (hrs){" "}
                      <span>(response time to the reporter)</span>
                    </div>
                    <Input
                      className={styles.input}
                      name="averageResTime"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.averageResTime}
                    />
                    {formik.errors.averageResTime &&
                      formik.touched.averageResTime && (
                        <Error>{formik.errors.averageResTime}</Error>
                      )}
                  </div>
                  <div className={styles.titleInput}>
                    <div className={styles.label}>
                      Average Triage Time (hrs){" "}
                      <span>(Conformation of Working Solution)</span>
                    </div>
                    <Input
                      className={styles.input}
                      name="averageTriageTime"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.averageTriageTime}
                    />
                    {formik.errors.averageTriageTime &&
                      formik.touched.averageTriageTime && (
                        <Error>{formik.errors.averageTriageTime}</Error>
                      )}
                  </div>
                </div>
                <div className={styles.titleInput}>
                  <div className={styles.label}>Description</div>
                  <TextArea
                    className={styles.textArea}
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <Error>{formik.errors.description}</Error>
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
                  <Button className={styles.submit} type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PostQueryPage;
