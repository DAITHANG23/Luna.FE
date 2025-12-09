"use client";
import { useAppSelector } from "@/libs/redux/hooks";
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

export const Concept = () => {
  const router = useRouter();
  const locale = useLocale();

  const params = useParams();

  const t = useTranslations("Concept");

  useEffect(() => {
    if (!params.concept) return;
    localStorage.setItem("routeConcept", params.concept as string);
  }, [params.concept]);

  const route = useMemo(() => {
    return CONCEPTS_ROUTES.find((c) => `/${c.route}` === `/${params.concept}`);
  }, [params]);

  useEffect(() => {
    const routeConcept = localStorage.getItem("routeConcept")?.trim() || "";

    const routeItem = CONCEPTS_ROUTES.some(
      (c) => `/${c.route}` === `/${routeConcept}`,
    );

    if (!routeItem) {
      notFound();
    }
  }, [router, route, params]);

  const allConcepts = useAppSelector((state) => state.masterData.allConcepts)
    ?.data.data;

  const concept = allConcepts?.find((item) => item.name === route?.name);

  return (
    <div className="mt-17 sm:mt-29 px-4 w-full xl:w-[80%] 2xl:w-[70%] mx-auto">
      <NavbarConcept params={params} />
      <Slider banners={concept?.banners || []} />
      <div className="lg:pt-10 lg:pt-[100px] lg:pb-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-10 justify-start items-start">
          <h3 className="text-primary-text">{concept?.title}</h3>
          <div className="text-primary-text">
            {concept?.description}
            <div className="pt-4">
              <Link
                href={`/${locale}/${route?.route}/menu`}
                className="flex gap-4 items-center hover:underline font-normal text-primary"
              >
                {t("seeMenu")}
                <div>
                  <ArrowRightIcon />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[300px] relative">
          <Image
            src={concept?.imageCover || "/assets/images/not-found.png"}
            alt="img-cover"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="pt-4 lg:pt-10 pb-5">
        <ConceptsList isBannerWidth />
      </div>
    </div>
  );
};
