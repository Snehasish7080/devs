import React, { CSSProperties, ReactElement } from "react";
import ProfilePlaceholderImg from "../../assets/images/user.svg";
import Image from "../Image/Image";
import styles from "./Avatar.module.scss";

export interface Props {
  image?: string | null;
  src?: string | null;
  width?: string;
  style?: CSSProperties;
  className?: string;
}

export const Avatar = ({
  image,
  src,
  width,
  style,
  className = "",
}: Props): ReactElement => {
  return (
    <div
      className={`${styles.avatar__container} ${className}`}
      style={{
        ...style,
        ...(width
          ? {
              width,
              height: width, // [1:1] ratio
            }
          : null),
        ...(image || src
          ? {
              background: `url(${image || src}) no-repeat center/cover`,
            }
          : {
              // background: `url(${""}) no-repeat center/cover`,
            }),
      }}
    >
      {!(image || src) && (
        <div className={styles.imageContainer}>
          <Image src={ProfilePlaceholderImg} className={styles.image} />
        </div>
      )}
    </div>
  );
};
