import Image from "next/image";
import React from "react";
import ArrowLeftSvg from "../icons/arrow-left.svg";

export const ArrowLeftIcon = () => {
  return (
    <div className="relative w-6 h-6">
      <Image src={ArrowLeftSvg} alt="ArrowIcon" fill />
    </div>
  );
};
