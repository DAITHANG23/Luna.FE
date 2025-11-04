"use client";
import React, { ChangeEvent, useMemo } from "react";
import { sortBy } from "lodash";
import { ConceptsFilter, IConcepts, IOptions } from "@/@types/models";
import { useDebouncedCallback } from "@/features/hooks/useDebouncedCallback";
import { formatCurrency } from "@/utils";
import {
  SearchField,
  SelectField,
  WrapperFilter,
} from "@/libs/shared/components";
import { useTranslations } from "next-intl";

interface ToolbarProps {
  filter: ConceptsFilter;
  onFilterChange: (filter: ConceptsFilter) => void;
}
export const Toolbar = ({ onFilterChange, filter }: ToolbarProps) => {
  const t = useTranslations("Restaurant");

  const conceptsOptions = useMemo(() => {
    const concepts = [
      { label: t("concepts.label.allConcepts"), value: "All" },
      { label: t("concepts.label.hotpot"), value: "hotpot" },
      { label: t("concepts.label.japanese"), value: "japanese" },
      { label: t("concepts.label.bbq"), value: "bbq" },
      { label: t("concepts.label.other"), value: "other" },
      { label: t("concepts.label.steakHouse"), value: "steakhouse" },
    ] as Array<IOptions>;
    return sortBy(concepts, "label");
  }, [t]);

  const priceOptions = useMemo(() => {
    const priceList = [
      {
        label: t("allPrices"),
        value: "All",
      },
      {
        label: `${t("under")} ${formatCurrency(100000, "đ")}`,
        value: { lt: 100000 },
      },
      {
        label: `${t("from")} ${formatCurrency(100000, "đ")} ${t("to")} ${formatCurrency(300000, "đ")}`,
        value: { gte: 100000, lte: 300000 },
      },
      {
        label: `${t("from")} ${formatCurrency(300000, "đ")} ${t("to")} ${formatCurrency(500000, "đ")}`,
        value: { gte: 300000, lte: 500000 },
      },
      {
        label: `${t("over")} ${formatCurrency(500000, "đ")}`,
        value: { gte: 500000 },
      },
    ] as Array<IOptions>;
    return priceList;
  }, [t]);

  const starOptions = useMemo(() => {
    const starList = [
      {
        label: t("allStar"),
        value: "All",
      },
      {
        label: "3 star",
        value: "3",
      },
      {
        label: "4 star",
        value: "4",
      },
      {
        label: "5 star",
        value: "5",
      },
    ] as Array<IOptions>;
    return starList;
  }, [t]);

  const handleConceptChange = (value: string) => {
    onFilterChange({ ...filter, concepts: value as IConcepts });
  };

  const handlePriceChange = (value: string) => {
    onFilterChange({ ...filter, price: value });
  };

  const handleTextChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ ...filter, searchText: event.target.value });
    },
    1000
  );

  const handleStarChange = (value: string) => {
    onFilterChange({ ...filter, star: value });
  };

  return (
    <WrapperFilter isConfirmButton>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:justify-start gap-5">
        <SearchField onChange={handleTextChange} />
        <SelectField
          key={"concepts"}
          value={filter?.concepts}
          options={conceptsOptions}
          onChange={handleConceptChange}
          placeholder="All concepts"
        />

        <SelectField
          key={"stars"}
          value={filter?.star}
          options={starOptions}
          onChange={handleStarChange}
          placeholder="All star"
        />

        <SelectField
          key={"prices"}
          value={filter?.price}
          options={priceOptions}
          onChange={handlePriceChange}
          placeholder="All prices"
        />
      </div>
    </WrapperFilter>
  );
};
