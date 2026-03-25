"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ConceptModel } from "@/@types/models";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
interface FavoriteConceptsViewProps {
  data: Array<ConceptModel>;
  isVisitedConcept?: boolean;
}
export const FavoriteConceptsView = ({
  data,
  isVisitedConcept = false,
}: FavoriteConceptsViewProps) => {
  const favoriteImages = useMemo(
    () => data?.map(i => i.imageCover) ?? [],
    [data]
  );

  const t = useTranslations("Concept");
  return (
    <div className="shadow-glass flex h-[19.7rem]! w-full cursor-pointer flex-col rounded-xl border-none transition duration-300 ease-in-out hover:scale-105 sm:w-87">
      <div className="flex h-[3.3rem] w-full gap-4 rounded-tl-xl rounded-tr-xl bg-white p-4 text-center">
        <p>
          {isVisitedConcept ? (
            <CheckCircleIconSolid className="h-7 w-7 text-black" />
          ) : (
            <HeartIconSolid className="text-primary h-7 w-7" />
          )}
        </p>
        <p className="font-base font-bold">
          {isVisitedConcept ? t("visited") : t("titleRestaurantFavorite")}
        </p>
      </div>
      <div className="relative h-68 w-full rounded-xl">
        {favoriteImages && favoriteImages.length >= 3 ? (
          <div className="flex h-full w-full">
            <div className="relative h-full w-[70%]">
              <Image
                src={`${favoriteImages[0]}`}
                alt="favoriteDish"
                layout="fill"
                className="rounded-bl-xl"
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="h-full w-[30%]">
              <div className="relative h-[50%] w-full">
                <Image
                  src={`${favoriteImages[1]}`}
                  alt="favoriteDish"
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              <div className="relative h-[50%] w-full">
                <Image
                  src={`${favoriteImages[2]}`}
                  alt="favoriteDish"
                  layout="fill"
                  className="rounded-br-xl"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={`${favoriteImages[0]}`}
            alt="favoriteDish"
            layout="fill"
            className="rounded-br-xl rounded-bl-xl"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};
