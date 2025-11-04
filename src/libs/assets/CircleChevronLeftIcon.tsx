import Image from "next/image";
import React from "react";
import CircleChevronLeftSvg from "../icons/circle-chevron-left.svg";

export const CircleChevronLeftIcon = () => {
  return (
    <div className="relative w-6 h-6">
      <Image src={CircleChevronLeftSvg} alt="CircleChevronLeftIcon" fill />
    </div>
  );
};
