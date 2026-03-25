import Image from "next/image";
import React from "react";

export const FacebookIcon = () => {
  return (
    <div className="relative h-4 w-4">
      <Image src={"/icons/facebook-icon.svg"} alt="facebookicon" fill />
    </div>
  );
};
