import React from "react";
import { Icon } from "@iconify/react";

interface IconProps {
  icon: string;
  className?: string;
  width?: string | number;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}

const Icons: React.FC<IconProps> = ({ icon, className, width, rotate, hFlip, vFlip }) => {
  return (
    <>
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icons;
