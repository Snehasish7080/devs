import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Avatar } from "../../atoms/Avatar/Avatar";
import Layout from "../../molecules/Layout/Layout";
import QueryReports from "../../molecules/QueryReports/QueryReports";
import styles from "./Profile.module.scss";
import { useQuery } from "react-query";
import { ApiResponse } from "apisauce";
import { user } from "../../api/User";
import { IUser } from "../../Interface/User";
import { Bone } from "../../atoms/Bone/Bone";

const queries = [
  {
    id: uuidv4(),
    price: "$100",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    price: "$100",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    price: "$100",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    price: "$100",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
  {
    id: uuidv4(),
    price: "$100",
    title: "queries is missing in type but required in type QueryReportsProps",
  },
];

type userData = {
  data: IUser;
};

function Profile() {
  const getUser = async () => {
    const response: ApiResponse<any, any> = await user();
    return response.data;
  };
  const { data } = useQuery<userData>("user", getUser);

  return (
    <Layout>
      <div className={styles.profileContainer}>
        <div className={styles.profileLeftContainer}>
          <div className={styles.profileInfo}>
            <div className={styles.header}>Profile</div>
            <div className={styles.profileInfoBody}>
              {data ? (
                <Avatar />
              ) : (
                <Bone
                  height={"60px"}
                  width={"60px"}
                  maxWidth={"100%"}
                  rounded={true}
                />
              )}
              <div className={styles.userInfoContainer}>
                {data ? (
                  <span>{data?.data?.username}</span>
                ) : (
                  <Bone height={"20px"} maxWidth={"80%"} />
                )}
                <p>
                  {data ? (
                    <>
                      <span>reputation:</span>
                      {data?.data?.reputation}
                    </>
                  ) : (
                    <Bone height={"20px"} maxWidth={"80%"} />
                  )}
                </p>
              </div>
            </div>
            <div className={styles.desc}>
              {data ? (
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  pretium pr
                </span>
              ) : (
                <Bone height={"30px"} maxWidth={"80%"} />
              )}
            </div>

            <div className={styles.desc}>
              <p>
                {data ? (
                  <>
                    <span>Proficiency: </span>React
                  </>
                ) : (
                  <Bone height={"20px"} maxWidth={"80%"} />
                )}
              </p>
            </div>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.header}>Skills</div>
            <div className={styles.profileInfoBody}>
              <div />
              <div className={styles.skillsContainer}>
                <span>React</span>
                <span>React Native</span>
                <span>PHP</span>
                <span>TypeScript</span>
                <span>CSS</span>
              </div>
            </div>
          </div>
        </div>

        <QueryReports queries={queries} />
      </div>
    </Layout>
  );
}

export default Profile;
