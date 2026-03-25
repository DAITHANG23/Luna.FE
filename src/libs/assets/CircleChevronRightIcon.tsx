import Image from "next/image";
import React from "react";
import CircleChevronRightSvg from "../icons/circle-chevron-right.svg";

export const CircleChevronRightIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={CircleChevronRightSvg} alt="CircleChevronRightIcon" fill />
    </div>
  );
};
