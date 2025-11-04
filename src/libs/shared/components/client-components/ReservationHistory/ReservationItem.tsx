"use client";
import useGetBooking from "@/features/hooks/BookingHooks/useGetBooking";
import React, { useMemo } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";
import { CONCEPTS_ROUTES } from "@/constants";
import Image from "next/image";
import dayjs from "dayjs";
import { Spinner, Stepper } from "@/libs/shared/components";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED_BY_USER: "Cancelled by User",
  CANCELLED_BY_ADMIN: "Cancelled by Admin",
};

const allSteps = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED"];
const allStepsWithCancellationByAdmin = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED_BY_ADMIN",
];
const allStepsWithCancellationByUser = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED_BY_USER",
];

interface ReservationItemProps {
  id?: string;
}
export const ReservationItem = ({ id }: ReservationItemProps) => {
  const t = useTranslations("Booking");
  const router = useRouter();
  const locale = useLocale();

  const { bookingData, isLoading } = useGetBooking(id as string);
  const dataBooking = bookingData?.data.data;

  const {
    status,
    restaurant,
    timeSlot,
    notes,
    numberPhone,
    email,
    peopleQuantity,
    statusHistory,
  } = dataBooking || {};
  const contentStatus = useMemo(() => {
    if (!dataBooking) return undefined;

    const status = dataBooking?.status;
    switch (status) {
      case "PENDING":
        return t("statusLabel.pending");
      case "CONFIRMED":
        return t("statusLabel.confirmed");
      case "IN_PROGRESS":
        return t("statusLabel.inProgress");
      case "CANCELLED_BY_USER":
      case "CANCELLED_BY_ADMIN":
        return t("statusLabel.cancelled");
      default:
        return t("statusLabel.completed");
    }
  }, [dataBooking, t]);

  const matchedConcept = useMemo(() => {
    const conceptName = dataBooking?.restaurant?.concept?.name;
    return CONCEPTS_ROUTES.find((item) => item.name === conceptName);
  }, [dataBooking]);

  const isCancelledStatusByAdmin = dataBooking?.status === "CANCELLED_BY_ADMIN";

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const formatted = useMemo(() => {
    return dataBooking?.timeOfBooking
      ? dayjs(dataBooking.timeOfBooking).format("DD/MM/YYYY")
      : "";
  }, [dataBooking?.timeOfBooking]);

  const isCancelledStatusByUser = dataBooking?.status === "CANCELLED_BY_USER";

  if (isLoading)
    return (
      <div className="mt-[8.5rem]">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-[7.25rem] w-[90%] xl:w-[70%] mx-auto bg-white dark:bg-gray-900 rounded-lg p-4 my-4 shadow-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-6">
        <button
          onClick={() => router.push(`/reservation-history`)}
          className=" flex items-center gap-2 text-primary-text hover:text-primary transition-colors w-64"
        >
          <ChevronLeftIcon />
          {t("button.goBack")}
        </button>
        <div className="flex">
          <p className="pr-2 border-r border-black text-center">
            {t("reservationCode")} 2412077RFADBD9
          </p>
          <p className="pl-2 text-primary text-center">
            {contentStatus?.toLocaleUpperCase()}
          </p>
        </div>
      </div>
      <hr className="!mb-14" />
      <Stepper
        allSteps={
          isCancelledStatusByAdmin
            ? allStepsWithCancellationByAdmin
            : isCancelledStatusByUser
              ? allStepsWithCancellationByUser
              : allSteps
        }
        statusHistory={statusHistory || []}
        labelMap={statusLabels}
      />
      <hr className="!mt-14" />

      <div className="bg-primary/20 w-full h-auto flex lg:flex-row flex-col gap-4 items-center justify-end p-4">
        {status === "COMPLETED" && (
          <div className="w-full h-auto flex lg:flex-row flex-col gap-4 lg:items-start lg:justify-between justify-center items-center">
            <p className="text-xs">{t("thankYou")}</p>
            <div className="flex flex-col gap-8">
              <button
                onClick={() =>
                  router.push(`${locale}/${matchedConcept?.route}/booking`)
                }
                className="px-5 py-3 bg-primary text-white hover:bg-primary/80 transition-colors text-sm text-center"
              >
                {t("button.bookingAgain")}
              </button>
              <button
                onClick={() =>
                  router.push(`${locale}/${matchedConcept?.route}/booking`)
                }
                className="px-5 py-3 bg-primary text-white hover:bg-primary/80 transition-colors text-sm text-center"
              >
                {t("button.contact")}
              </button>
            </div>
          </div>
        )}
        {status !== "COMPLETED" && (
          <div className="flex justify-end items-end">
            <button
              onClick={() => router.push(`${locale}/${matchedConcept?.route}`)}
              className="px-5 py-3 bg-primary text-white hover:bg-primary/80 transition-colors text-sm text-center"
            >
              {t("button.contact")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 p-4">
        <div className="flex justify-between lg:flex-row flex-col gap-4">
          <div className="flex gap-4 justify-start text-start items-center ">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push(`${locale}/${matchedConcept?.route}`);
              }}
            >
              <Image
                src={matchedConcept?.logo || "/favicon.ico"}
                alt="logo"
                width={matchedConcept?.width || 50}
                height={matchedConcept?.height || 50}
              />
            </div>

            <p className="text-primary-text font-bold">{restaurant?.name}</p>
          </div>
        </div>
        <div className="flex gap-4 text-black flex-col py-4 lg:p-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
            <div>
              <div className="flex items-center gap-2 justify-start">
                <MailIcon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="whitespace-normal break-words min-w-[150px]">
                  {email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-primary" />
                {numberPhone}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" /> {formatted}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-primary" />
                {timeSlot}
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-primary" />
                {peopleQuantity}
              </div>
            </div>
          </div>

          {notes && (
            <div className="text-start text-black ">
              <p className="text-sm font-bold">{t("note")}</p>
              <p className="text-sm">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
