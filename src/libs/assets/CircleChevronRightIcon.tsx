import Image from "next/image";
import React from "react";
import CircleChevronRightSvg from "../icons/circle-chevron-right.svg";

export const CircleChevronRightIcon = () => {
  return (
    <div className="relative w-6 h-6">
      <Image src={CircleChevronRightSvg} alt="CircleChevronRightIcon" fill />
    </div>
  );
};
