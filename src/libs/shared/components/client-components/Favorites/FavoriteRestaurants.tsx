"use client";
import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { ConceptModel } from "@/@types/models";
import Image from "next/image";
import { ArrowLeftIcon } from "@/libs/assets";
import { CONCEPTS_ROUTES, ROUTES } from "@/constants";
import { Spinner } from "@/libs/shared/components";
import ConceptItem from "../ConceptItem/ConceptItem";
import { useTranslations } from "next-intl";
import { Link } from "@/libs/i18n/navigation";
import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export const FavoriteRestaurants = () => {
  const tConcept = useTranslations("Concept");

  const router = useRouter();
  const locale = useLocale();

  const { conceptsData, isLoading: isLoadingFavoriteConceptsData } =
    useGetFavoriteConcepts();

  const favoriteconcepts = conceptsData?.data?.data || [];

  const handleClickConcept = useCallback(
    (nameConcept: string) => {
      const route = CONCEPTS_ROUTES.find((c) => c.name === nameConcept);
      if (!route) return;

      localStorage.setItem("routeConcept", route.route);

      router.push(`/${locale}/${route.route}`);
    },
    [router, locale]
  );

  if (isLoadingFavoriteConceptsData)
    return (
      <div className="mt-[8.5rem]">
        <Spinner />
      </div>
    );
  return (
    <div className="my-20 sm:my-[6.5rem] p-8">
      <div className="w-full lg:w-[80%] mx-auto mb-10">
        <button
          onClick={() => router.push(`${ROUTES.FAVORITE_CONCEPTS.INDEX}`)}
          className="flex gap-2 items-center border border-solid dark:border-white rounded-lg border-black px-3 hover:bg-gray-200 mb-4"
        >
          <ArrowLeftIcon />
          <span className="font-base text-primary-text dark:hover:text-black">
            {tConcept("button.back")}
          </span>
        </button>
        {favoriteconcepts?.length > 0 && (
          <h4 className="pt-8 text-primary-text">{tConcept("title")}</h4>
        )}
        {favoriteconcepts && favoriteconcepts.length > 0 ? (
          <div className="py-8 grid grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center">
            {favoriteconcepts?.map((concept: ConceptModel) => {
              return (
                <div key={concept.name}>
                  <ConceptItem
                    concept={concept}
                    onClickConcept={handleClickConcept}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full lg:w-[60%] mx-auto text-center">
            <h1 className="text-primary-text">
              {tConcept("emptyContent")}
              <br /> {`:(`}
            </h1>
            <div className="w-full h-[8.75rem] relative rounded-xl">
              <Image
                src={"/assets/images/favoriteRestaurant.gif"}
                alt="favorite-restaurant"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                objectFit="contain"
              />
            </div>
            <div className="dark:text-white">
              {tConcept("touchTheHeartIcon")}
              <Link
                href={ROUTES.CONCEPTS.INDEX}
                className="px-1 dark:text-primary"
              >
                {tConcept("restaurant")}
              </Link>
              <br />
              {tConcept("andItWill")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
