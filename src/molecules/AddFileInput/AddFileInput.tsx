import React, { ReactElement, useRef } from "react";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import styles from "./AddFileInput.module.scss";

type AddFileInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddFileInput = ({ onChange }: AddFileInputProps): ReactElement => {
  const ref = useRef<HTMLInputElement>(null);

  const handleEditDocClick = () => {
    let input = ref.current;
    if (input) {
      input.click();
    }
  };

  return (
    <>
      <Input
        type="file"
        ref={ref}
        onChange={onChange}
        accept=".png,.jpg,.jpeg"
        multiple={true}
        className={styles.hiddenInput}
      />
      <div className={styles.DetailContestFileInput}>
        <Button
          onClick={handleEditDocClick}
          type="button"
          className={styles.addFiles}
        >
          + Upload files
        </Button>
        {/* <span>
          Add files which can give idea to freelancer what do you want
        </span> */}
      </div>
    </>
  );
};

export default AddFileInput;
