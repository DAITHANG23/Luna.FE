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
    () => data?.map((i) => i.imageCover) ?? [],
    [data]
  );

  const t = useTranslations("Concept");
  return (
    <div className="flex flex-col w-full sm:w-87 h-[19.7rem]! shadow-glass border-none rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105">
      <div className="flex text-center  w-full h-[3.3rem] p-4 gap-4 bg-white rounded-tl-xl rounded-tr-xl">
        <p>
          {isVisitedConcept ? (
            <CheckCircleIconSolid className="text-black w-7 h-7" />
          ) : (
            <HeartIconSolid className="text-primary w-7 h-7" />
          )}
        </p>
        <p className="font-base font-bold">
          {isVisitedConcept ? t("visited") : t("titleRestaurantFavorite")}
        </p>
      </div>
      <div className="w-full h-68 relative rounded-xl">
        {favoriteImages && favoriteImages.length >= 3 ? (
          <div className="w-full h-full flex">
            <div className="w-[70%] h-full relative">
              <Image
                src={`${favoriteImages[0]}`}
                alt="favoriteDish"
                layout="fill"
                className="rounded-bl-xl"
                objectFit="cover"
                loading="lazy"
              />
            </div>
            <div className="w-[30%] h-full">
              <div className="w-full h-[50%] relative">
                <Image
                  src={`${favoriteImages[1]}`}
                  alt="favoriteDish"
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              <div className="w-full h-[50%] relative">
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
