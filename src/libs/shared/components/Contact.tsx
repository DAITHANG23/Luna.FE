import { FacebookIcon } from "@/libs/assets";
import { GithubIcon } from "@/libs/assets";
import { LinkedinIcon } from "@/libs/assets";
import React from "react";

export const Contact = () => {
  return (
    <div className="flex items-center space-x-4 pt-0 p-6">
      <a
        href="https://www.facebook.com/DomNguyen2306"
        className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
        aria-label="Facebook"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/domnguyen236/"
        className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
        aria-label="Linkedin"
      >
        <LinkedinIcon />
      </a>
      <a
        href="https://github.com/DAITHANG23"
        className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
        aria-label="Github"
      >
        <GithubIcon />
      </a>
    </div>
  );
};
