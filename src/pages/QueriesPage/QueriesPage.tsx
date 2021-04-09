import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QueriesCard from "../../molecules/QueriesCard/QueriesCard";
import styles from "./QueriesPage.module.scss";
import SearchIcon from "../../assets/images/SearchIcon.svg";
import IconInput from "../../molecules/IconInput/IconInput";
import { CheckBox } from "../../atoms/CheckBox/CheckBox";
import Layout from "../../molecules/Layout/Layout";
import Filter from "../../molecules/Filter/Filter";
import { category } from "../../api/Category";
import { ApiResponse } from "apisauce";
import { useQuery } from "react-query";
import { IFilter } from "../../Interface/Filter";
import { queries } from "../../api/Query";
import { IQuery } from "../../Interface/Query";
import { Bone } from "../../atoms/Bone/Bone";
import { IUser } from "../../Interface/User";

type QueriesData = {
  data: IQuery[];
};

function QueriesPage() {
  const [filters, setFilters] = useState<IFilter[]>([]);

  const getAllCategory = async () => {
    const response: ApiResponse<any, any> = await category();
    return response.data;
  };
  const { data: FilterData } = useQuery<IFilter[]>("category", getAllCategory, {
    refetchOnWindowFocus: false,
  });

  const getAllQuery = async () => {
    const response: ApiResponse<any, any> = await queries();
    return response.data;
  };

  const { data: Queries } = useQuery<QueriesData>("queries", getAllQuery);
  const [queriesCopy, setQueriesCopy] = useState(Queries?.data);

  const checkBoxChange = (value: IFilter) => {
    const techs = filters;
    const idIndex = techs.findIndex((x) => x._id === value._id);
    if (idIndex >= 0) {
      techs.splice(idIndex, 1);
      setFilters(techs);
    } else if (idIndex === -1) {
      techs.push(value);
      setFilters(techs);
    }

    if (filters.length > 0) {
      const filterData = queriesCopy;
      let Data = [] as IQuery[];
      filters.forEach((element) => {
        Data = (filterData || [])?.filter((item) =>
          item.categoryID?.includes(element._id)
        );
      });
      // const Data = filterData?.map((item,index)=>item.categoryID?.includes()))
      setQueriesCopy(Data);
    } else {
      if (Queries?.data) {
        setQueriesCopy(Queries?.data);
      }
    }
  };

  useEffect(() => {
    if (Queries?.data) {
      setQueriesCopy(Queries?.data);
    }
  }, [Queries?.data]);

  return (
    <Layout className={styles.queriesMainContainer}>
      <div className={styles.searchInputContainer}>
        <div className={styles.titleInfoContainer}>
          <div className={styles.title}>Query</div>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </div>
        <IconInput
          icon={SearchIcon}
          className={styles.searchInput}
          placeholder={"Search Query"}
        />
      </div>
      <section className={styles.queriesContainer}>
        <div>
          <div className={styles.leftMainContainer}>
            {FilterData ? (
              <Filter
                filters={FilterData || []}
                title="Query Features"
                onCheckBoxChange={checkBoxChange}
              />
            ) : (
              <Filter />
            )}
          </div>
        </div>
        <div>
          <div className={styles.rightContainer}>
            {Queries ? (
              <>
                {(queriesCopy || []).map((item, index) => {
                  return (
                    <QueriesCard
                      id={item._id}
                      title={item.title}
                      description={item.description}
                      userName={item.postedBy.username}
                      key={index}
                    />
                  );
                })}
              </>
            ) : (
              new Array(5).fill(<QueriesCard />)
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default QueriesPage;
