import React from "react";
import Icon from "../../atoms/Icon/Icon";
import styles from "./ImageTag.module.scss";
import Cross from "../../assets/images/Cross.svg";
import Image from "../../atoms/Image/Image";

type ImageTagProps = {
  tagName: string;
  onCross: () => void;
};
function ImageTag({ tagName, onCross }: ImageTagProps) {
  return (
    <div className={styles.imageTag}>
      <span>{tagName}</span>
      <div onClick={onCross}>
        <Image src={Cross} />
      </div>
    </div>
  );
}

export default ImageTag;
