"use client";
import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { ConceptModel } from "@/@types/models";
import Image from "next/image";
import { ArrowLeftIcon } from "@/libs/assets";
import { CONCEPTS_ROUTES, ROUTES } from "@/constants";
import { Spinner } from "@/libs/shared/components";
import ConceptItem from "../ConceptItem/ConceptItem";
import { useTranslations } from "next-intl";
import { Link } from "@/libs/next-intl/navigation";
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
      const route = CONCEPTS_ROUTES.find(c => c.name === nameConcept);
      if (!route) return;

      localStorage.setItem("routeConcept", route.route);

      router.push(`/${locale}/${route.route}`);
    },
    [router, locale]
  );

  if (isLoadingFavoriteConceptsData)
    return (
      <div className="mt-34">
        <Spinner />
      </div>
    );
  return (
    <div className="my-20 p-8 sm:my-26">
      <div className="mx-auto mb-10 w-full lg:w-[80%]">
        <button
          onClick={() => router.push(`${ROUTES.FAVORITE_CONCEPTS.INDEX}`)}
          className="mb-4 flex items-center gap-2 rounded-lg border border-solid border-black px-3 hover:bg-gray-200 dark:border-white"
        >
          <ArrowLeftIcon />
          <span className="font-base text-primary-text dark:hover:text-black">
            {tConcept("button.back")}
          </span>
        </button>
        {favoriteconcepts?.length > 0 && (
          <h4 className="text-primary-text pt-8">{tConcept("title")}</h4>
        )}
        {favoriteconcepts && favoriteconcepts.length > 0 ? (
          <div className="grid grid-cols-1 flex-wrap items-center justify-between gap-6 py-8 text-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
          <div className="mx-auto w-full text-center lg:w-[60%]">
            <h1 className="text-primary-text">
              {tConcept("emptyContent")}
              <br /> {`:(`}
            </h1>
            <div className="relative h-35 w-full rounded-xl">
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
                href={ROUTES.BOOKING_RESTAURANT.INDEX}
                className="text-primary px-1"
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
