import React, { useState } from "react";
import { Bone } from "../../atoms/Bone/Bone";
import { CheckBox } from "../../atoms/CheckBox/CheckBox";
import Input from "../../atoms/Input/Input";
import { IFilter } from "../../Interface/Filter";
import styles from "./Filter.module.scss";

type FilterProps = {
  filters?: IFilter[];
  title?: string;
  onCheckBoxChange?: (value: IFilter) => void;
};

type FilterCheckBox = {
  value?: IFilter;
  onCheckBoxChange?: (value: IFilter) => void;
};
const FilterCheckBox = ({ value, onCheckBoxChange }: FilterCheckBox) => {
  return (
    <div className={styles.checkboxRow}>
      {value ? (
        <>
          <CheckBox
            onChange={() => {
              onCheckBoxChange && onCheckBoxChange(value as IFilter);
            }}
          />
          <span>{value?.name}</span>
        </>
      ) : (
        <Bone height={"20px"} width={"18rem"} />
      )}
    </div>
  );
};

function Filter({ filters, title = "Filter", onCheckBoxChange }: FilterProps) {
  const [input, setInput] = useState("");
  const FiltersCopy =
    input === ""
      ? filters
      : (filters || []).filter((x) =>
          x.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        );

  return (
    <div className={styles.filterContainer}>
      <div className={styles.header}>
        {filters ? title : <Bone height={"22px"} width={"70%"} />}
      </div>
      <div className={styles.inputContainer}>
        <Input
          name="searchFilter"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.checkBoxContainer}>
        {filters ? (
          <>
            {(FiltersCopy || []).map((item, index) => {
              return (
                <FilterCheckBox
                  value={item}
                  onCheckBoxChange={onCheckBoxChange}
                  key={item._id}
                />
              );
            })}
          </>
        ) : (
          new Array(10).fill(<FilterCheckBox />)
        )}
      </div>
    </div>
  );
}

export default Filter;
