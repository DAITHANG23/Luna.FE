"use client";
import { ABOUT_IMAGES } from "@/constants";
import { Utensils, Clock, MapPin, Phone, Mail } from "lucide-react";
import React, { useMemo } from "react";
import { Contact, Slider } from "@/libs/shared/components";
import { LayoutMotion } from "@/libs/shared/components";
import { WeOfferSection } from "./WeOfferSection";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import useMasterData from "@/features/hooks/useMasterData";
// import { useMounted } from "@/features/hooks/useMounted";
const Map = dynamic(
  () =>
    import("@/libs/shared/components/client-components/Map/Map").then(
      mod => mod.Map
    ),
  {
    ssr: false,
  }
);
export const About = () => {
  const t = useTranslations("Home");

  const { allRestaurants } = useMasterData();

  const locationsRestaurantsList = useMemo(() => {
    return allRestaurants?.map(item => ({
      lat: item.location?.lat,
      lng: item.location?.lng,
      address: item.location?.address,
      name: item?.name,
    }));
  }, [allRestaurants]);

  return (
    <div>
      <div className="mx-auto mt-34 max-w-full p-4 pt-0 sm:max-w-[70%] sm:p-0">
        <div className="from-primary/10 via-secondary/20 to-primary/10 mb-10 rounded-xl bg-linear-to-r py-8 text-center">
          <h1 className="from-primary via-primary/80 to-primary mb-4 bg-linear-to-r bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
            {t("about.title")}
          </h1>
          <p className="text-primary-text text-muted-foreground mx-auto! max-w-full px-4 text-center text-base sm:max-w-[65%] sm:text-xl">
            {t("about.content")}
          </p>
        </div>
        <Slider isSmallSize coverImages={ABOUT_IMAGES} />

        <LayoutMotion className="from-secondary/40 to-secondary/40 mb-12 rounded-xl bg-linear-to-r via-transparent p-8 shadow-md">
          <h2 className="text-primary mb-8! text-center text-3xl font-semibold">
            {t("about.ourStory")}
          </h2>
          <div className="text-primary-text space-y-6 text-lg leading-relaxed">
            <p>{t("about.contentStory")}</p>
            <p>{t("about.contentStory1")}</p>
          </div>
        </LayoutMotion>

        <div className="my-12">
          <WeOfferSection />
        </div>
        <div className="bg-primary/30 my-12 h-px shrink-0"></div>

        <div className="mb-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <LayoutMotion>
            <div className="from-card to-primary/5 border-primary/10 hover:border-primary/30 rounded-lg border-2 bg-linear-to-br shadow-md transition-colors">
              <div className="bg-primary/5 rounded-t-lg p-6">
                <h3 className="text-primary flex items-center gap-2">
                  <Utensils className="text-primary h-5 w-5" />
                  {t("about.ourCuisine")}
                </h3>
              </div>

              <p className="text-primary-text px-6! pt-0 pb-2">
                {t("about.contentOurCuisine")}
              </p>
              <ul className="text-primary-text mt-4 list-inside list-disc space-y-2 px-6">
                <li>{t("about.cuisine1")}</li>
                <li>{t("about.cuisine2")}</li>
                <li>{t("about.cuisine3")}</li>
              </ul>
            </div>
          </LayoutMotion>

          <LayoutMotion>
            <div className="from-card to-primary/5 border-primary/10 hover:border-primary/30 rounded-lg border-2 bg-linear-to-br shadow-md transition-colors">
              <div className="bg-primary/5 rounded-t-lg p-6">
                <h3 className="text-primary flex items-center gap-2">
                  <Clock className="text-primary h-5 w-5" />{" "}
                  {t("about.openHour")}
                </h3>
              </div>

              <div className="text-primary-text flex flex-col gap-4 p-6">
                <p>
                  <span className="font-bold">{t("about.monFri")}:</span> 11:00
                  - 22:00
                </p>
                <p>
                  <span className="font-bold">{t("about.satSun")}:</span> 10:00
                  - 23:00
                </p>
                <p>
                  <span className="font-bold">{t("about.holidays")}:</span>
                  {t("about.specialHour")}
                </p>
              </div>
            </div>
          </LayoutMotion>

          <LayoutMotion className="from-card to-primary/5 border-primary/10 hover:border-primary/30 rounded-lg border-2 bg-linear-to-br shadow-md transition-colors">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <MapPin className="text-primary h-5 w-5" />
                {t("about.location")}
              </h3>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <Map
                className="h-100!"
                locationsList={locationsRestaurantsList}
              />
            </div>
          </LayoutMotion>

          <LayoutMotion className="from-card to-primary/5 border-primary/10 hover:border-primary/30 rounded-lg border-2 bg-linear-to-br shadow-md transition-colors">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <Phone className="text-primary h-5 w-5" /> {t("about.contact")}
              </h3>
            </div>

            <div className="text-primary-text flex flex-col gap-4 p-6 break-all">
              <p className="flex gap-2">
                <span className="font-bold">
                  <Mail />
                </span>
                Nguyendaithang23061997@gmail.com
              </p>
              <p className="flex gap-2">
                <span className="font-bold">
                  <Phone />
                </span>
                +(84) 0772757220
              </p>
            </div>

            <Contact />
          </LayoutMotion>
        </div>

        <div className="from-primary/20 via-primary/30 to-primary/20 my-12 rounded-xl bg-linear-to-r p-8 text-center shadow-lg">
          <h2 className="text-primary mb-4 text-2xl font-semibold">
            {t("about.visitUs")}
          </h2>
          <p className="text-primary-text text-lg">
            {t("about.lookingForward")}
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 font-medium text-white no-underline transition-colors hover:shadow-lg"
            >
              {t("about.reservation")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
