import Image from "next/image";
import React from "react";

export const GithubIcon = () => {
  return (
    <div className="relative h-4 w-4">
      <Image src={"/icons/github.svg"} alt="githubicon" fill />
    </div>
  );
};
