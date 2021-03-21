import React, {ReactElement} from 'react';
import styles from './Bone.module.scss';

export interface Props {
  className?: string,
  style?: React.CSSProperties,
  height?: string,
  width?: string,
  maxWidth?: string,
  rounded?: boolean,
}

/**
 * Loading Skeleton Bone Component
 */
export const Bone = ({
  className = '',
  style,
  height,
  width,
  maxWidth,
  rounded,
}: Props): ReactElement => {
  return (
    <div
      className={`${styles.Bone} ${className}`}
      style={{
        ...style,
        ...(rounded?{
          borderRadius: '50px',
        }:null),
        ...(height?{height}:null),
        ...(width?{width}:null),
        ...(maxWidth?{maxWidth}:null),
      }}
    ></div>
  );
};