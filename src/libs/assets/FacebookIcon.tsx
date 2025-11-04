import Image from "next/image";
import React from "react";

export const FacebookIcon = () => {
  return (
    <div className="relative w-4 h-4">
      <Image src={"/icons/facebook-icon.svg"} alt="facebookicon" fill />
    </div>
  );
};
