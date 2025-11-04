import Image from "next/image";
import React from "react";

export const IllustrationDashboardImage = () => {
  return (
    <div>
      <Image
        src={"/assets/images/illustration-dashboard.png"}
        alt="reset-password"
        width={120}
        height={120}
      />
    </div>
  );
};
