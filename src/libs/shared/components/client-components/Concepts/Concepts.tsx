"use client";
import { ConceptModel, ConceptsFilter } from "@/@types/models";
import React, { useCallback, useMemo, useState } from "react";
import { CONCEPTS_ROUTES, defaultFilter } from "@/constants";
import useGetAllConcepts from "@/features/hooks/ConceptsHooks/useGetAllConcepts";
import { sortBy } from "lodash";
import { Skeleton } from "@shared/components/index";
import {
  LazyConceptItem,
  Toolbar,
} from "@shared/components/client-components/Concepts";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const Concepts = () => {
  const [filter, setFilter] = useState(defaultFilter);

  const t = useTranslations("Concept");

  const router = useRouter();
  const locale = useLocale();

  const { concepts, price, searchText, star } = filter;

  const handleFilterChange = (f: ConceptsFilter) => {
    setFilter(f as typeof filter);
  };

  const conceptsParams = useMemo(() => {
    if (concepts === "All") {
      return "";
    }
    return concepts;
  }, [concepts]);

  const priceParams = useMemo(() => {
    if (price === "All") return "";
    return price;
  }, [price]);

  const starParams = useMemo(() => {
    if (star === "All") return "";
    if (star === "3") return { gte: 3, lt: 3.5 };
    if (star === "4") return { gte: 3.5, lt: 4 };
    if (star === "5") return { gte: 4.5, lt: 5 };
  }, [star]);

  const params = useMemo(() => {
    return {
      type: conceptsParams,
      price: priceParams,
      searchText,
      avgRatings: starParams,
    };
  }, [conceptsParams, priceParams, searchText, starParams]);

  const { conceptsData, isLoading } = useGetAllConcepts(params);

  const conceptsDataSort = sortBy(conceptsData?.data.data, "name");

  const handleClickConcept = useCallback(
    (nameConcept: string) => {
      const route = CONCEPTS_ROUTES.find(c => c.name === nameConcept);
      if (!route) return;

      localStorage.setItem("routeConcept", route.route);

      router.push(`/${locale}/${route.route}`);
    },
    [router, locale]
  );

  return (
    <div className="mt-20 flex flex-col p-4 sm:mt-30 sm:p-8">
      <Toolbar onFilterChange={handleFilterChange} filter={filter} />

      <h3 className="text-primary-text">{`Domique Fusion: ${conceptsData?.results || 0} concepts`}</h3>

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {conceptsDataSort && conceptsDataSort.length > 0 ? (
            <div className="grid grid-cols-1 flex-wrap items-center justify-between gap-6 py-8 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {conceptsDataSort?.map((concept: ConceptModel, index) => {
                return (
                  <div key={concept._id}>
                    <LazyConceptItem
                      concept={concept}
                      index={index}
                      onClickConcept={handleClickConcept}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="my-20 w-full text-center">
              <p>{t("notFound")}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
