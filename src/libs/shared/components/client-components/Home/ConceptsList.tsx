"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { RESTAURANTS_CONCEPT } from "@/constants";
import { cn } from "@/utils";
import { MailIcon, PhoneIcon } from "@/libs/assets";
import { Contact } from "@/libs/shared/components";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ConceptsListProps {
  isBannerWidth?: boolean;
}

export const ConceptsList = ({ isBannerWidth }: ConceptsListProps) => {
  const params = useParams();

  return (
    <div className="bg-primary flex flex-col md:flex-row dark:bg-[#1C252E]">
      <div
        className={cn(
          isBannerWidth &&
            "mx-0! border-b-4 border-b-gray-300 sm:border-r-4 sm:border-b-0 xl:w-[70%]! dark:border-r-gray-300",
          "not-prose mx-auto mt-[50px] mb-[50px] w-full rounded-lg bg-gray-100 p-6 lg:mt-[100px] xl:w-[60%] dark:bg-gray-700"
        )}
        style={{ fontFamily: "Inter" }}
      >
        {RESTAURANTS_CONCEPT.map(i => {
          return (
            <div key={i.type} className="flex flex-col pt-[20px] sm:flex-row">
              <div className="flex flex-row items-center gap-2 border-b border-dashed border-gray-300 sm:h-[60px] sm:min-w-[150px] sm:flex-col sm:items-start sm:gap-0 sm:border-r sm:border-b-0">
                <h3 className="dark:text-secondary-text text-[18px] font-bold">
                  {i.type}
                </h3>
                <p className="dark:text-secondary-text text-[18px] font-bold sm:text-xs sm:font-normal">
                  CONCEPT
                </p>
              </div>
              <ul
                className={clsx(
                  i.type === "OTHER"
                    ? "sm:w-[80%] xl:grid-cols-4 2xl:w-[70%]"
                    : "sm:w-[90%] xl:grid-cols-3 2xl:w-[60%]",
                  "grid h-[150px] w-full grid-cols-2 gap-4 p-1 px-4 sm:border-b sm:border-dashed sm:border-gray-300 xl:h-auto"
                )}
              >
                {i.items.map(restaurant => {
                  return (
                    <li key={restaurant.name} className="relative">
                      <Link href={`/${params.locale}/${restaurant.url}`}>
                        <Image
                          src={restaurant.img1}
                          alt={restaurant.name}
                          width={restaurant.width}
                          height={restaurant.height}
                          loading="lazy"
                          className="absolute inset-0 h-[55px] transition-opacity duration-300 hover:opacity-0"
                        />
                        <Image
                          src={restaurant.img2}
                          alt={restaurant.name}
                          width={restaurant.width}
                          height={restaurant.height}
                          loading="lazy"
                          className="absolute inset-0 h-[55px] opacity-0 transition-opacity duration-300 hover:opacity-100"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      {isBannerWidth && (
        <div className="p-4">
          <h4 className="text-primary-text pb-[20px]">Contact us</h4>
          <div className="flex flex-col gap-4 pt-[30px]">
            <div className="flex gap-2">
              <MailIcon />
              <p className="text-primary-text">
                Nguyendaithang23061997@gmail.com
              </p>
            </div>
            <div className="flex gap-2">
              <PhoneIcon />
              <p className="text-primary-text">+(84) 0772757220</p>
            </div>
          </div>
          <div className="flex justify-center pt-[30px] text-center">
            <Contact />
          </div>
        </div>
      )}
    </div>
  );
};
