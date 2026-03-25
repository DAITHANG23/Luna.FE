"use client";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

interface EmptyFavoriteRestaurantProps {
  isVisitedConcept?: boolean;
}

export const EmptyFavoriteRestaurant = ({
  isVisitedConcept,
}: EmptyFavoriteRestaurantProps) => {
  const t = useTranslations("Concept");
  return (
    <div className="shadow-glass flex h-[19.7rem]! w-full cursor-pointer flex-col rounded-xl border-none bg-white transition duration-300 ease-in-out hover:scale-105 sm:w-87">
      <div className="flex h-[3.3rem] w-full gap-4 rounded-xl bg-white p-4 text-center">
        {isVisitedConcept ? (
          <CheckCircleIconSolid className="h-7 w-7 text-black" />
        ) : (
          <HeartIconSolid className="text-primary h-7 w-7" />
        )}
        <p className="font-base font-bold">
          {isVisitedConcept ? t("visited") : t("titleRestaurantFavorite")}
        </p>
      </div>
      <div className="mt-4 flex h-35 w-full items-center justify-center rounded-xl">
        {isVisitedConcept ? (
          <CheckCircleIcon className="h-12 w-12 text-gray-400" />
        ) : (
          <Image
            src={"/assets/images/favoriteRestaurant.gif"}
            alt="favorite-restaurant"
            width={200}
            height={200}
            objectFit="contain"
          />
        )}
      </div>
      <p className="pt-8">{t("emptyListTitle")}</p>
    </div>
  );
};
