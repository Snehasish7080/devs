import { ApiResponse } from "apisauce";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { category } from "../../api/Category";
import { Avatar } from "../../atoms/Avatar/Avatar";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import TextArea from "../../atoms/TextArea/TextArea";
import { IFilter } from "../../Interface/Filter";
import { MediaI } from "../../Interface/MediaI";
import Filter from "../../molecules/Filter/Filter";
import Layout from "../../molecules/Layout/Layout";
import styles from "./SettingsPage.module.scss";

function SettingsPage() {
  const ref = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      proficiency: "",
      about: "",
      country: "",
      state: "",
      pin: "",
      media: [] as MediaI[],
      ServerError: "",
    },
    // validationSchema: reportValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      //   setCommentData([...commentData, values]);
      console.log(values);
    },
  });

  const getAllCategory = async () => {
    const response: ApiResponse<any, any> = await category();
    return response.data;
  };
  const { data } = useQuery<IFilter[]>("category", getAllCategory, {
    refetchOnWindowFocus: false,
  });

  const handleEditDocClick = () => {
    let input = ref.current;
    if (input) {
      input.click();
    }
  };

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
        const media = newMedia;
        return {
          ...prev,
          media,
        };
      });
    }
  };
  return (
    <Layout>
      <div className={styles.settingsMainContainer}>
        <div>
          <Filter title="Skills" filters={data || []} />
        </div>
        <div>
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className={styles.settingsContainer}>
              <div className={styles.header}>Profile Settings</div>
              <div className={styles.inputContainer}>
                <div className={styles.avatarContainer}>
                  <div onClick={handleEditDocClick}>
                    <Avatar image={(formik.values.media || [])[0]?.content} />
                  </div>
                  <Input
                    type="file"
                    ref={ref}
                    name="media"
                    onChange={handleAddDocuments}
                    // value={formik.values.media.content}
                    accept=".png,.jpg,.jpeg"
                    // multiple={true}
                    className={styles.hiddenInput}
                  />
                </div>
                <div className={styles.titleInput}>
                  <div className={styles.label}>First Name</div>
                  <Input
                    className={styles.input}
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                </div>
                <div className={styles.titleInput}>
                  <div className={styles.label}>Last Name</div>
                  <Input
                    className={styles.input}
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                </div>
                <div className={styles.titleInput}>
                  <div className={styles.label}>Proficiency</div>
                  <Input
                    className={styles.input}
                    name="proficiency"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.proficiency}
                  />
                </div>

                <div className={`${styles.titleInput} ${styles.takeAreaLast}`}>
                  <div className={styles.label}>About You</div>
                  <TextArea
                    className={styles.textArea}
                    name="about"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.about}
                  />
                </div>

                <div className={styles.titleInput}>
                  <div className={styles.label}>Country</div>
                  <Input
                    className={styles.input}
                    name="country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                  />
                </div>
                <div className={styles.titleInput}>
                  <div className={styles.label}>State</div>
                  <Input
                    className={styles.input}
                    name="state"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                  />
                </div>
                <div className={styles.titleInput}>
                  <div className={styles.label}>PIN Code</div>
                  <Input
                    className={styles.input}
                    name="pin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pin}
                  />
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button className={styles.submit} type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default SettingsPage;
