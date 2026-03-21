"use client";
import React, { useMemo } from "react";
import _ from "lodash";
import useGetConceptItem from "@/features/hooks/ConceptsHooks/useGetConceptItem";
import Menu from "./Menu";
import NavbarConcept from "@/libs/shared/components/client-components/NavbarConcept/NavbarConcept";
import { Booking } from "./Booking";
import { Skeleton } from "@shared/components/index";
import { useParams, usePathname } from "next/navigation";
import useMasterData from "@/features/hooks/useMasterData";

export const Navbar = () => {
  const pathname = usePathname();
  const params = useParams();
  const pathnameMain = pathname?.split("/")[2];
  const { allConcepts } = useMasterData();

  const nameConcept = useMemo(() => {
    let pathname = "";
    switch (pathnameMain) {
      case "kichi-kichi":
        return (pathname = "Kichi-Kichi");
      case "hang-cuon":
        return (pathname = "Hàng cuốn");
      case "crystal-jade":
        return (pathname = "Crystal Jade");
      case "sumo-yakiniku":
        return (pathname = "Sumo Yakiniku");
      default:
        pathname = _.capitalize(pathnameMain);
    }
    return pathname;
  }, [pathnameMain]);

  const subPathname = pathname?.split("/")[3];

  const idConcept = useMemo(() => {
    return allConcepts?.find(c => c.name === nameConcept)?._id || "";
  }, [allConcepts, nameConcept]);

  const { conceptData, isLoading } = useGetConceptItem(idConcept);

  if (isLoading)
    return (
      <div className="mt-17 sm:mt-29">
        <Skeleton />
      </div>
    );
  return (
    <div className="mx-auto my-4 mt-17 w-[90%] rounded-lg bg-white p-4 shadow-lg sm:mt-29 2xl:w-[70%] dark:bg-gray-900">
      <NavbarConcept params={params} />

      {subPathname === "menu" ? (
        <Menu dishes={conceptData?.data.data?.dishes || []} conceptName={pathnameMain} />
      ) : (
        <Booking conceptDataId={conceptData?.data.data._id || ""} />
      )}
    </div>
  );
};
