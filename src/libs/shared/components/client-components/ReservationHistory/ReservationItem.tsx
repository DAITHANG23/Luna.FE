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
import { useTranslations } from "next-intl";
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
    return CONCEPTS_ROUTES.find(item => item.name === conceptName);
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
      <div className="mt-34">
        <Spinner />
      </div>
    );

  return (
    <div className="mx-auto my-4 mt-29 w-[90%] rounded-lg bg-white p-4 shadow-lg xl:w-[70%] dark:bg-gray-900">
      <div className="mb-4 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <button
          onClick={() => router.back()}
          className="text-primary-text hover:text-primary flex w-64 items-center gap-2 transition-colors"
        >
          <ChevronLeftIcon />
          {t("button.goBack")}
        </button>
        <div className="flex">
          <p className="border-primary-text text-primary-text border-r pr-2 text-center">
            {t("reservationCode")} 2412077RFADBD9
          </p>
          <p className="text-primary pl-2 text-center">
            {contentStatus?.toLocaleUpperCase()}
          </p>
        </div>
      </div>
      <hr className="text-primary-text mb-14!" />
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
      <hr className="text-primary-text mt-14!" />

      <div className="bg-primary/20 flex h-auto w-full flex-col items-center justify-end gap-4 p-4 lg:flex-row">
        {status === "COMPLETED" && (
          <div className="flex h-auto w-full flex-col items-center justify-center gap-4 lg:flex-row lg:items-start lg:justify-between">
            <p className="text-primary-text text-xs">{t("thankYou")}</p>
            <div className="flex flex-col gap-8">
              <button
                onClick={() =>
                  router.replace(`/${matchedConcept?.route}/booking`)
                }
                className="bg-primary hover:bg-primary/80 px-5 py-3 text-center text-sm text-white transition-colors"
              >
                {t("button.bookingAgain")}
              </button>
              <button
                onClick={() =>
                  router.replace(`/${matchedConcept?.route}/booking`)
                }
                className="bg-primary hover:bg-primary/80 px-5 py-3 text-center text-sm text-white transition-colors"
              >
                {t("button.contact")}
              </button>
            </div>
          </div>
        )}
        {status !== "COMPLETED" && (
          <div className="flex items-end justify-end">
            <button
              onClick={() => router.replace(`/${matchedConcept?.route}`)}
              className="bg-primary hover:bg-primary/80 px-5 py-3 text-center text-sm text-white transition-colors"
            >
              {t("button.contact")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 p-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex items-center justify-start gap-4 text-start">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push(`/${matchedConcept?.route}`);
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
        <div className="flex flex-col gap-4 py-4 text-black lg:p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
            <div>
              <div className="flex items-center justify-start gap-2">
                <MailIcon className="text-primary h-4 w-4 shrink-0" />
                <span className="text-primary-text min-w-[150px] wrap-break-word whitespace-normal">
                  {email}
                </span>
              </div>
              <div className="text-primary-text flex items-center gap-2">
                <PhoneIcon className="text-primary h-4 w-4" />
                {numberPhone}
              </div>
            </div>

            <div>
              <div className="text-primary-text flex items-center gap-2">
                <CalendarIcon className="text-primary h-4 w-4" /> {formatted}
              </div>
              <div className="text-primary-text flex items-center gap-2">
                <ClockIcon className="text-primary h-4 w-4" />
                {timeSlot}
              </div>
              <div className="text-primary-text flex items-center gap-2">
                <UsersIcon className="text-primary h-4 w-4" />
                {peopleQuantity}
              </div>
            </div>
          </div>

          {notes && (
            <div className="text-start text-black">
              <p className="text-primary text-sm font-bold">{t("note")}</p>
              <p className="text-primary-text text-sm">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
