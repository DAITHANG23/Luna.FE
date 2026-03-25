import Image from "next/image";
import React from "react";
import ArrowLeftSvg from "../icons/arrow-left.svg";

export const ArrowLeftIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={ArrowLeftSvg} alt="ArrowIcon" fill />
    </div>
  );
};
