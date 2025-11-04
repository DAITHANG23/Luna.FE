import Image from "next/image";
import React from "react";

export const AuthorizationImage = () => {
  return (
    <div>
      <Image
        src={"/assets/images/401-error.jpg"}
        alt="401"
        width={500}
        height={300}
        className="rounded-lg shadow-lg max-w-[100%] h-auto"
      />
    </div>
  );
};
