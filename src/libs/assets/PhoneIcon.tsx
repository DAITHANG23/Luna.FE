import Image from "next/image";
import React from "react";
import PhoneIconSvg from "../icons/phone-icon.svg";

export const PhoneIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={PhoneIconSvg} alt="PhoneIcon" fill />
    </div>
  );
};
