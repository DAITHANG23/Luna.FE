"use client";
import { ABOUT_IMAGES } from "@/constants";
import { useAppSelector } from "@/libs/redux/hooks";
import { Utensils, Clock, MapPin, Phone, Mail } from "lucide-react";
import React, { useMemo } from "react";
import { Contact, Slider } from "@/libs/shared/components";
import { LayoutMotion } from "@/libs/shared/components";
import { WeOfferSection } from "./WeOfferSection";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
// import { useMounted } from "@/features/hooks/useMounted";
const Map = dynamic(
  () =>
    import("@/libs/shared/components/client-components/Map/Map").then(
      (mod) => mod.Map,
    ),
  {
    ssr: false,
  },
);
export const About = () => {
  const t = useTranslations("Home");

  // const mounted = useMounted();
  const restaurantsData = useAppSelector(
    (state) => state.masterData?.allRestaurants,
  );

  const locationsRestaurantsList = useMemo(() => {
    return restaurantsData?.data.data.map((item) => ({
      lat: item.location?.lat,
      lng: item.location?.lng,
      address: item.location?.address,
      name: item?.name,
    }));
  }, [restaurantsData]);
  // if (!mounted) return null;

  return (
    <div>
      <div className="max-w-full pt-0 p-4 sm:p-0 sm:max-w-[70%] mx-auto mt-34">
        <div className="mb-10 text-center bg-linear-to-r from-primary/10 via-secondary/20 to-primary/10 py-8 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            {t("about.title")}
          </h1>
          <p className="text-primary-text text-base sm:text-xl text-center text-muted-foreground max-w-full sm:max-w-[65%] mx-auto! px-4">
            {t("about.content")}
          </p>
        </div>
        <Slider isSmallSize coverImages={ABOUT_IMAGES} />

        <LayoutMotion className="mb-12 bg-linear-to-r from-secondary/40 via-transparent to-secondary/40 p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-8! text-center text-primary">
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
        <div className="my-12 bg-primary/30 shrink-0 h-px"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
          <LayoutMotion>
            <div className="bg-linear-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
              <div className="bg-primary/5 rounded-t-lg p-6">
                <h3 className="text-primary flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  {t("about.ourCuisine")}
                </h3>
              </div>

              <p className="text-primary-text pt-0 px-6! pb-2">
                {t("about.contentOurCuisine")}
              </p>
              <ul className="text-primary-text mt-4 space-y-2 px-6 list-disc list-inside">
                <li>{t("about.cuisine1")}</li>
                <li>{t("about.cuisine2")}</li>
                <li>{t("about.cuisine3")}</li>
              </ul>
            </div>
          </LayoutMotion>

          <LayoutMotion>
            <div className="bg-linear-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
              <div className="bg-primary/5 rounded-t-lg p-6">
                <h3 className="text-primary flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />{" "}
                  {t("about.openHour")}
                </h3>
              </div>

              <div className="text-primary-text p-6 flex flex-col gap-4">
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

          <LayoutMotion className="bg-linear-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {t("about.location")}
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <Map
                className="h-100!"
                locationsList={locationsRestaurantsList}
              />
            </div>
          </LayoutMotion>

          <LayoutMotion className="bg-linear-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" /> {t("about.contact")}
              </h3>
            </div>

            <div className="text-primary-text p-6 flex flex-col gap-4 break-all">
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

        <div className="my-12 text-center bg-linear-to-r from-primary/20 via-primary/30 to-primary/20 p-8 rounded-xl shadow-lg">
          <h2 className="text-primary text-2xl font-semibold mb-4">
            {t("about.visitUs")}
          </h2>
          <p className="text-primary-text text-lg">
            {t("about.lookingForward")}
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="bg-primary text-white no-underline text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors hover:shadow-lg"
            >
              {t("about.reservation")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
