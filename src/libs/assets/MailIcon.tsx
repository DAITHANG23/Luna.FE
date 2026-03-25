import Image from "next/image";
import React from "react";
import MailIcontSvg from "../icons/mail-icon.svg";

export const MailIcon = () => {
  return (
    <div className="relative h-6 w-6">
      <Image src={MailIcontSvg} alt="MailIcontSvg" fill />
    </div>
  );
};
