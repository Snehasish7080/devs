import React from "react";
import RBImage, { ImageProps } from "react-bootstrap/Image";

type Props = {
  src?: string | null | undefined;
} & ImageProps;

const Image = (props: Props) => {
  return <RBImage {...props} />;
};

export default Image;
