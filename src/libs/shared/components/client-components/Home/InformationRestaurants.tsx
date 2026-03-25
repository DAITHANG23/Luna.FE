"use client";
import Image from "next/image";
import React from "react";
import { ROUTES } from "@/constants";
import { useRouter } from "@/libs/next-intl/navigation";

export const InformationRestaurants = () => {
  const router = useRouter();
  return (
    <div className="bg-primary relative h-auto w-full sm:h-[552px] dark:bg-[#1C252E]">
      <div className="m-auto flex w-[80%] flex-col justify-center gap-10 sm:flex-row">
        <div className="relative h-[552px] w-full px-[16px] sm:w-[40%]">
          <Image
            src={"/assets/images/img-map-vn.png"}
            alt="map-vn"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="objectFit-cover"
            loading="lazy"
          />
        </div>
        <div className="relative h-[300px] px-[16px] sm:w-[40%]">
          <Image
            src={"/assets/images/img-curture.png"}
            alt="curture"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex justify-center py-10 sm:absolute sm:right-[25%] sm:bottom-[50px] lg:right-[30%]">
        <button
          className="boder-none text-primary-text bg-warning/80 hover:bg-warning/90 rounded-lg px-6 py-1"
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
