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
      const route = CONCEPTS_ROUTES.find(c => c.name === nameConcept);
      if (!route) return;

      localStorage.setItem("routeConcept", route.route);

      router.push(`/${locale}/${route.route}`);
    },
    [router, locale]
  );

  if (isLoadingCheckInConceptsData)
    return (
      <div className="mt-34">
        <Spinner />
      </div>
    );
  return (
    <div className="my-20 p-8 sm:my-26">
      <div className="mx-auto mb-10 w-full lg:w-[80%]">
        <button
          onClick={() => router.push(ROUTES.FAVORITE_CONCEPTS.INDEX)}
          className="mb-4 flex items-center gap-2 rounded-lg border border-solid border-black px-3 hover:bg-gray-200 dark:border-white"
        >
          <ArrowLeftIcon />
          <span className="font-base text-primary-text dark:hover:text-black">
            {t("button.back")}
          </span>
        </button>
        {checkInConcepts?.length > 0 && (
          <h4 className="text-primary-text pt-8">{t("titleCheckIn")}</h4>
        )}
        {checkInConcepts && checkInConcepts.length > 0 ? (
          <div className="grid grid-cols-1 flex-wrap items-center justify-between gap-6 py-8 text-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
          <div className="mx-auto w-full text-center lg:w-[60%]">
            <h1 className="text-primary-text">
              {t("checkinEmptyContent")}
              <br /> {`:(`}
            </h1>
            <div className="flex h-35 w-full items-center justify-center rounded-xl">
              <CheckCircleIcon className="h-20 w-20 text-gray-400" />
            </div>
            <div className="text-primary-text">
              {t("touchTheVisitIcon")}
              <Link href={ROUTES.CONCEPTS.INDEX} className="text-primary px-1">
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
