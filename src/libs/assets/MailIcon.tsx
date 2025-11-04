import Image from "next/image";
import React from "react";
import MailIcontSvg from "../icons/mail-icon.svg";

export const MailIcon = () => {
  return (
    <div className="relative w-6 h-6">
      <Image src={MailIcontSvg} alt="MailIcontSvg" fill />
    </div>
  );
};
