"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Phone } from "lucide-react";
import useGetRestaurantsOfConcept from "@/features/hooks/RestaurantsHooks/useGetRestaurantsOfConcept";
import { useDebouncedCallback } from "@/features/hooks/useDebouncedCallback";
import { Modal, SearchField } from "@/libs/shared/components";
import BookingForm from "./BookingForm";
import { RestaurantModel } from "@/@types/models";
import dynamic from "next/dynamic";
import { useMounted } from "@/features/hooks/useMounted";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/libs/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import useNotification from "@/features/hooks/useNotification";
import { useSnackbar } from "notistack";
interface BookingProps {
  conceptDataId: string;
}

const Map = dynamic(
  () =>
    import("@/libs/shared/components/client-components/Map/Map").then(
      (mod) => mod.Map,
    ),
  {
    ssr: false,
  },
);

export const Booking = ({ conceptDataId }: BookingProps) => {
  const tRestaurant = useTranslations("Restaurant");
  const tTranslation = useTranslations("Translation");
  const mounted = useMounted();
  const router = useRouter();
  const pathname = usePathname();
  const { showWarning } = useNotification();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const accountInfo = useAppSelector((state) => state.auth.accountInfo);
  const [chooseRestaurant, setChooseRestaurant] = useState<string | null>(null);
  const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!accountInfo?.data.data.numberPhone) {
      const notifId = enqueueSnackbar(
        <div
          onClick={() => {
            closeSnackbar(notifId);
            router.push(`/profile?from=${pathname}`);
          }}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          <div>
            <p
              className="text-sm pb-2"
              dangerouslySetInnerHTML={{
                __html: tTranslation("bookingWarning"),
              }}
            />
            👉
            <span className="underline! underline-offset-2 font-bold pl-2">
              {tTranslation("navbar.yourProfile")}
            </span>
          </div>
        </div>,
        {
          variant: "info",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 120000,
        },
      );
    }
  }, [
    accountInfo?.data.data.numberPhone,
    pathname,
    tTranslation,
    enqueueSnackbar,
    closeSnackbar,
    router,
  ]);

  useEffect(() => {
    if (!isAuth && isOpenModalBooking) {
      showWarning(tRestaurant("warningBooking"));
      router.push(`/login?from=${pathname}`);
    }
  }, [isAuth, isOpenModalBooking, router, pathname, showWarning, tRestaurant]);

  const params = useMemo(() => {
    return { searchText };
  }, [searchText]);
  const { restaurantsData } = useGetRestaurantsOfConcept(conceptDataId, params);

  const restaurants = useMemo(() => {
    if (!restaurantsData?.data.restaurants) return [];
    return restaurantsData?.data.restaurants as Array<RestaurantModel>;
  }, [restaurantsData]);

  const locationsRestaurantsList = useMemo(() => {
    return restaurants.map((item) => ({
      lat: item.location?.lat,
      lng: item.location?.lng,
      address: item.location?.address,
      name: item?.name,
      numberPhone: item?.numberPhone,
      timeSlot: item?.timeSlot,
    }));
  }, [restaurants]);

  const handleTextChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );
  if (!mounted) return null;

  return (
    <div className="mt-4">
      <Modal
        open={isOpenModalBooking}
        setOpen={setIsOpenModalBooking}
        classNameContainer="max-w-[31.1125rem]!"
      >
        <BookingForm
          chooseRestaurant={chooseRestaurant}
          restaurantsData={restaurantsData}
          setIsOpenModalBooking={setIsOpenModalBooking}
        />
      </Modal>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[30%]">
          <SearchField
            classNameContainer="w-full!"
            placeholder="Tìm kiếm nhà hàng"
            onChange={handleTextChange}
          />
          <div className="mt-10">
            {locationsRestaurantsList?.map((item) => (
              <div key={item.name}>
                <h3 className="pb-5 text-primary-text">{item.name}</h3>
                <div className="text-primary-text">
                  <p>{item.address}</p>
                  <p>
                    {tRestaurant("openClose")}:
                    {`${item.timeSlot[0].startTime} - ${item.timeSlot[0].endTime}`}
                  </p>
                </div>
                <div className="flex gap-4 pt-5 pb-3">
                  <button className="flex bg-primary/30 border border-primary rounded-[4px] text-center text-white text-sm px-3 py-2 gap-2 hover:scale-105">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-primary">{item.numberPhone}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOpenModalBooking(true);
                      setChooseRestaurant(item.name);
                    }}
                    className="bg-primary rounded-[4px] text-center text-white text-sm px-3 py-2 hover:scale-105"
                  >
                    {tRestaurant("button.booking")}
                  </button>
                </div>
                <hr />
              </div>
            ))}
            {searchText.trim().length > 0 &&
              locationsRestaurantsList &&
              locationsRestaurantsList?.length <= 0 && (
                <div className="text-primary-text text-center">
                  {tRestaurant("notFound")}
                </div>
              )}
          </div>
        </div>
        <div className="w-full lg:w-[70%]">
          <Map
            key={`${locationsRestaurantsList?.[0]?.lat}`}
            locationsList={locationsRestaurantsList}
            className="h-[400px]! lg:h-350!"
            lat={locationsRestaurantsList?.[0]?.lat}
            lng={locationsRestaurantsList?.[0]?.lng}
          />
        </div>
      </div>
    </div>
  );
};
