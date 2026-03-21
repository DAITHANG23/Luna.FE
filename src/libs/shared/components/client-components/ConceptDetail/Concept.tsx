"use client";

import React, { useEffect, useMemo } from "react";
import { CONCEPTS_ROUTES } from "@/constants";
import Image from "next/image";
import { ArrowRightIcon } from "@/libs/assets";
import { Slider } from "@/libs/shared/components";
import { ConceptsList } from "@/libs/shared/components/client-components/Home";
import NavbarConcept from "@/libs/shared/components/client-components/NavbarConcept/NavbarConcept";
import { useLocale, useTranslations } from "next-intl";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useMasterData from "@/features/hooks/useMasterData";

export const Concept = () => {
  const router = useRouter();
  const locale = useLocale();

  const params = useParams();

  const t = useTranslations("Concept");

  const { allConcepts } = useMasterData();

  useEffect(() => {
    if (!params.concept) return;
    localStorage.setItem("routeConcept", params.concept as string);
  }, [params.concept]);

  const route = useMemo(() => {
    return CONCEPTS_ROUTES.find(c => `/${c.route}` === `/${params.concept}`);
  }, [params]);

  useEffect(() => {
    const routeConcept = localStorage.getItem("routeConcept")?.trim() || "";

    const routeItem = CONCEPTS_ROUTES.some(c => `/${c.route}` === `/${routeConcept}`);

    if (!routeItem) {
      notFound();
    }
  }, [router, route, params]);

  const concept = allConcepts?.find(item => item.name === route?.name);

  return (
    <div className="mx-auto mt-17 w-full px-4 sm:mt-29 xl:w-[80%] 2xl:w-[70%]">
      <NavbarConcept params={params} />
      <Slider banners={concept?.banners || []} />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:pt-10 lg:pt-[100px] lg:pb-8">
        <div className="flex flex-col items-start justify-start gap-10">
          <h3 className="text-primary-text">{concept?.title}</h3>
          <div className="text-primary-text">
            {concept?.description}
            <div className="pt-4">
              <Link
                href={`/${locale}/${route?.route}/menu`}
                className="text-primary flex items-center gap-4 font-normal hover:underline"
              >
                {t("seeMenu")}
                <div>
                  <ArrowRightIcon />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] w-full">
          <Image
            src={concept?.imageCover || "/assets/images/not-found.png"}
            alt="img-cover"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="pt-4 pb-5 lg:pt-10">
        <ConceptsList isBannerWidth />
      </div>
    </div>
  );
};
