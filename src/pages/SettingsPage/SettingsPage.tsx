import { ApiResponse } from "apisauce";
import React from "react";
import { useQuery } from "react-query";
import { category } from "../../api/Category";
import Input from "../../atoms/Input/Input";
import TextArea from "../../atoms/TextArea/TextArea";
import { IFilter } from "../../Interface/Filter";
import Filter from "../../molecules/Filter/Filter";
import Layout from "../../molecules/Layout/Layout";
import styles from "./SettingsPage.module.scss";

function SettingsPage() {
  const getAllCategory = async () => {
    const response: ApiResponse<any, any> = await category();
    return response.data;
  };
  const { data } = useQuery<IFilter[]>("category", getAllCategory, {
    refetchOnWindowFocus: false,
  });
  return (
    <Layout>
      <div className={styles.settingsMainContainer}>
        <div>
          <Filter title="Skills" filters={data || []} />
        </div>
        <div>
          <div className={styles.settingsContainer}>
            <div className={styles.header}>Profile Settings</div>
            <div className={styles.inputContainer}>
              <div className={styles.titleInput}>
                <div className={styles.label}>First Name</div>
                <Input className={styles.input} name="title" />
              </div>
              <div className={styles.titleInput}>
                <div className={styles.label}>Last Name</div>
                <Input className={styles.input} name="title" />
              </div>
              <div className={styles.titleInput}>
                <div className={styles.label}>Proficiency</div>
                <Input className={styles.input} name="title" />
              </div>

              <div className={`${styles.titleInput} ${styles.takeAreaLast}`}>
                <div className={styles.label}>About You</div>
                <TextArea className={styles.textArea} name="description" />
              </div>

              <div className={styles.titleInput}>
                <div className={styles.label}>Country</div>
                <Input className={styles.input} name="title" />
              </div>
              <div className={styles.titleInput}>
                <div className={styles.label}>State</div>
                <Input className={styles.input} name="title" />
              </div>
              <div className={styles.titleInput}>
                <div className={styles.label}>PIN Code</div>
                <Input className={styles.input} name="title" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SettingsPage;
