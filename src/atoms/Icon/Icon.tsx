import React from "react";
// import "./Icon.scss";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  theme?: "light" | "dark";
  size?: "large" | "small" | "default";
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Icon = ({
  size,
  className,
  theme = "light",
  onClick,
  ...props
}: Props) => {
  return (
    <i
      className={`${theme} ${size} ${className}`}
      {...props}
      onClick={onClick}
    />
  );
};

export default Icon;
