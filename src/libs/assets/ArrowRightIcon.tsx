import Image from "next/image";
import React from "react";
import ArrowRightSvg from "../icons/arrow-right.svg";

export const ArrowRightIcon = () => {
  return (
    <div className="relative w-6 h-6">
      <Image src={ArrowRightSvg} alt="ArrowRightIcon" fill />
    </div>
  );
};
