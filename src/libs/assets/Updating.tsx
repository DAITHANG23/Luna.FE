import Image from "next/image";
import React from "react";

export const Updating = () => {
  return (
    <div>
      <Image
        src={"/assets/images/loading-updating.png"}
        alt="updating"
        width={500}
        height={300}
        loading="lazy"
        className="h-auto max-w-full rounded-lg shadow-lg"
      />
    </div>
  );
};
