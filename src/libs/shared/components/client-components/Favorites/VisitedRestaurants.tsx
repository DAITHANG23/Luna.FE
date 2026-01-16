"use client";

import { ConceptModel } from "@/@types/models";
import { ArrowLeftIcon } from "@/libs/assets";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import useGetCheckInConcepts from "@/features/hooks/ConceptsHooks/useGetCheckInConcepts";
import { CONCEPTS_ROUTES, ROUTES } from "@/constants";
import { Spinner } from "@/libs/shared/components";
import { useCallback, useMemo } from "react";
import ConceptItem from "../ConceptItem/ConceptItem";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/libs/next-intl/navigation";
import { useRouter } from "next/navigation";

export const VisitedRestaurants = () => {
  const t = useTranslations("Concept");
  const router = useRouter();
  const locale = useLocale();

  const { checkInConceptsData, isLoading: isLoadingCheckInConceptsData } =
    useGetCheckInConcepts();

  const checkInConcepts = useMemo(() => {
    return checkInConceptsData?.data?.data || [];
  }, [checkInConceptsData]);

  const handleClickConcept = useCallback(
    (nameConcept: string) => {
      const route = CONCEPTS_ROUTES.find((c) => c.name === nameConcept);
      if (!route) return;

      localStorage.setItem("routeConcept", route.route);

      router.push(`/${locale}/${route.route}`);
    },
    [router, locale],
  );

  if (isLoadingCheckInConceptsData)
    return (
      <div className="mt-34">
        <Spinner />
      </div>
    );
  return (
    <div className="my-20 sm:my-26 p-8">
      <div className="w-full lg:w-[80%] mx-auto mb-10">
        <button
          onClick={() => router.push(ROUTES.FAVORITE_CONCEPTS.INDEX)}
          className="flex gap-2 items-center border border-solid dark:border-white rounded-lg border-black px-3 hover:bg-gray-200 mb-4"
        >
          <ArrowLeftIcon />
          <span className="font-base text-primary-text dark:hover:text-black">
            {t("button.back")}
          </span>
        </button>
        {checkInConcepts?.length > 0 && (
          <h4 className="pt-8 text-primary-text">{t("titleCheckIn")}</h4>
        )}
        {checkInConcepts && checkInConcepts.length > 0 ? (
          <div className="py-8 grid grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center">
            {checkInConcepts?.map((concept: ConceptModel) => {
              return (
                <div key={concept.name}>
                  <ConceptItem
                    concept={concept}
                    isReviewBtn
                    onClickConcept={handleClickConcept}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full lg:w-[60%] mx-auto text-center">
            <h1 className="text-primary-text">
              {t("checkinEmptyContent")}
              <br /> {`:(`}
            </h1>
            <div className="h-35 w-full flex items-center justify-center rounded-xl">
              <CheckCircleIcon className="text-gray-400 w-20 h-20" />
            </div>
            <div className="text-primary-text">
              {t("touchTheVisitIcon")}
              <Link href={ROUTES.CONCEPTS.INDEX} className="px-1 text-primary">
                {t("restaurant")}
              </Link>
              <br />
              {t("andItWillVisited")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
