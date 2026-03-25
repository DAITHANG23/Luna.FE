import Image from "next/image";
import React from "react";

export const LinkedinIcon = () => {
  return (
    <div className="relative h-4 w-4">
      <Image src={"/icons/linkedin.svg"} alt="linkedin" fill />
    </div>
  );
};
