import Image from "next/image";
import React from "react";
import ArrowRightSvg from "../icons/arrow-right.svg";

export const ArrowRightIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={ArrowRightSvg} alt="ArrowRightIcon" fill />
    </div>
  );
};
