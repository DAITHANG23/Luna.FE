import Image from "next/image";
import React from "react";
import PhoneIconSvg from "../icons/phone-icon.svg";

export const PhoneIcon = () => {
  return (
    <div className="relative w-6 h-6">
      <Image src={PhoneIconSvg} alt="PhoneIcon" fill />
    </div>
  );
};
