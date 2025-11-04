"use client";
import React, { useMemo } from "react";
import { useAppSelector } from "@/libs/redux/hooks";
import _ from "lodash";
import useGetConceptItem from "@/features/hooks/ConceptsHooks/useGetConceptItem";
import Menu from "./Menu";
import NavbarConcept from "@/libs/shared/components/client-components/NavbarConcept/NavbarConcept";
import { Booking } from "./Booking";
import { Skeleton } from "@shared/components/index";
import { usePathname } from "@/libs/i18n/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameMain = pathname?.split("/")[1];

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

  const subPathname = pathname?.split("/")[2];
  const allConcepts = useAppSelector((state) => state.masterData.allConcepts)
    ?.data.data;
  const idConcept = useMemo(() => {
    return allConcepts?.find((c) => c.name === nameConcept)?._id || "";
  }, [allConcepts, nameConcept]);

  const { conceptData, isLoading } = useGetConceptItem(idConcept);

  if (isLoading)
    return (
      <div className="mt-[4.25rem] sm:mt-[7.25rem]">
        <Skeleton />
      </div>
    );
  return (
    <div className="mt-[4.25rem] sm:mt-[7.25rem] w-[90%] 2xl:w-[70%] mx-auto bg-white dark:bg-gray-900 rounded-lg p-4 my-4 shadow-lg">
      <NavbarConcept pathname={pathname} />
      {subPathname === "menu" ? (
        <Menu
          dishes={conceptData?.data.data?.dishes || []}
          conceptName={pathnameMain}
        />
      ) : (
        <Booking conceptDataId={conceptData?.data.data._id || ""} />
      )}
    </div>
  );
};
