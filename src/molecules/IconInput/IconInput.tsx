import React from "react";
import styles from "./IconInput.module.scss";
import Input from "../../atoms/Input/Input";
import Image from "../../atoms/Image/Image";

type IconInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon: string;
};

const IconInput = ({ icon, ref, ...Props }: IconInputProps) => {
  return (
    <div className={`${styles.IconInput} ${Props.className}`}>
      <Image src={icon} className={styles.iconImage} />
      <Input
        {...Props}
        ref={ref as React.RefObject<HTMLInputElement>}
        className={styles.input}
        placeholder={Props.placeholder}
      />
    </div>
  );
};

export default IconInput;
