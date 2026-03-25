import Image from "next/image";
import React from "react";
import StarIconSvg from "../icons/star-icon.svg";
export const StarIcon = () => {
  return (
    <div className="relative h-4 w-4">
      <Image src={StarIconSvg} alt="staricon" fill />
    </div>
  );
};
