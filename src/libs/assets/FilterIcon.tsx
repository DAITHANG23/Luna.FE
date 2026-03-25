import React from "react";
import FilterIconSvg from "../icons/filter.svg";
import Image from "next/image";
export const FilterIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={FilterIconSvg} alt="FilterIcon" fill />
    </div>
  );
};
