import React from "react";
import FilterOpenIconSvg from "../icons/filter-open.svg";
import Image from "next/image";
export const FilterOpenIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={FilterOpenIconSvg} alt="FilterOpenIconSvg" fill />
    </div>
  );
};
