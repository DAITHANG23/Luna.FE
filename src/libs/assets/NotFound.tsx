import Image from "next/image";
import React from "react";

export const NotFound = () => {
  return (
    <div>
      <Image
        src={"/assets/images/not-found.png"}
        alt="not-found"
        width={500}
        height={300}
        loading="lazy"
        className="rounded-lg shadow-lg max-w-[100%] h-auto"
      />
    </div>
  );
};
