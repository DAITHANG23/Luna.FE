"use client";
import Image from "next/image";
import React from "react";
import { ROUTES } from "@/constants";
import { useRouter } from "@/libs/next-intl/navigation";

export const InformationRestaurants = () => {
  const router = useRouter();
  return (
    <div className="relative w-full h-auto sm:h-[552px] bg-primary dark:bg-[#1C252E]">
      <div className="w-[80%] m-auto flex sm:flex-row flex-col justify-center gap-10">
        <div className="relative w-full sm:w-[40%] h-[552px] px-[16px]">
          <Image
            src={"/assets/images/img-map-vn.png"}
            alt="map-vn"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className=" objectFit-cover"
            loading="lazy"
          />
        </div>
        <div className="relative sm:w-[40%] h-[300px] px-[16px]">
          <Image
            src={"/assets/images/img-curture.png"}
            alt="curture"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex justify-center py-10 sm:absolute sm:bottom-[50px] sm:right-[25%] lg:right-[30%]">
        <button
          className="boder-none rounded-lg px-6 py-1 text-primary-text bg-warning/80 hover:bg-warning/90"
          onClick={() => {
            router.push(`${ROUTES.ABOUT.INDEX}`);
          }}
        >
          DETAIL
        </button>
      </div>
    </div>
  );
};
