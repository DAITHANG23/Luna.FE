"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import { BookingModel } from "@/@types/models/booking";
import {
  CONCEPTS_ROUTES,
  ROUTES,
  STATUS_BOOKING,
  StatusLabel,
} from "@/constants";
import { cn, getStatusClass } from "@/utils";
import dayjs from "dayjs";
import apiService from "@/api/endpoints/index";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import useUpdateReservation from "@/features/hooks/BookingHooks/useUpdateReservation";
import { ModalNotification } from "@/libs/shared/components";
import { GET_ALL_RESEVATIONS_KEY } from "@/app/constants/queryKeys";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface BookingDetailProps {
  item: BookingModel;
}

const STATUS_CONFIRMED = [
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED_BY_USER",
  "CANCELLED_BY_ADMIN",
  "NO_SHOW",
];
export const BookingDetail = ({ item }: BookingDetailProps) => {
  const t = useTranslations("Booking");
  const router = useRouter();
  const locale = useLocale();
  const { showSuccess } = useNotification();

  const { mutateAsync: updateReservation } = useUpdateReservation();
  const concept = useMemo(() => {
    return CONCEPTS_ROUTES.find(
      (c) => c.name === item?.restaurant?.concept?.name,
    );
  }, [item]);
  const queryClient = useQueryClient();
  const [isOpenCanceledModal, setIsOpenCanceledModal] = useState(false);

  const openCanceledModal = () => {
    setIsOpenCanceledModal(!isOpenCanceledModal);
  };

  const handleCanceledReservation = async () => {
    if (item?.status === "PENDING") {
      await apiService.bookings.deleteReservation({ id: item?._id });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_RESEVATIONS_KEY] });
    }

    if (item?.status === "CONFIRMED") {
      await updateReservation({ status: "CANCELLED_BY_USER", _id: item?._id });
    }

    showSuccess(t("notification.canceled"));
    setIsOpenCanceledModal(false);
  };

  const formatted = dayjs(item?.timeOfBooking).format("DD/MM/YYYY");

  const status = useMemo(() => {
    if (item?.status) {
      return STATUS_BOOKING.find((s) => s.status === item.status);
    }
  }, [item]);

  return (
    <>
      {isOpenCanceledModal && (
        <ModalNotification
          title={t("modal.delete.title")}
          content={t("modal.delete.content")}
          icon={
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-6 text-red-600"
            />
          }
          open={isOpenCanceledModal}
          setOpen={setIsOpenCanceledModal}
          labelButton={t("modal.delete.labelButton")}
          type="delete"
          action={
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-primary/80 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 sm:ml-3 sm:w-auto"
              onClick={handleCanceledReservation}
            >
              {t("modal.delete.button")}
            </button>
          }
        />
      )}
      <div className="flex flex-col gap-5 mb-5 justify-between p-5 text-center bg-white dark:bg-gray-800 shadow-xl rounded-lg transition-all duration-200 hover:-translate-y-0.5">
        <div className="flex justify-between lg:flex-row flex-col gap-4">
          <div className="flex gap-4 justify-start text-start items-center ">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push(`/${locale}/${concept?.route}`);
              }}
            >
              <Image
                src={concept?.logo || "/favicon.ico"}
                alt="logo"
                width={concept?.width}
                height={concept?.height}
              />
            </div>

            <p className="text-primary-text font-bold">
              {item?.restaurant?.name}
            </p>
          </div>

          <p
            className={cn(
              getStatusClass(item?.status || ""),
              "text-xs font-semibold py-1 px-2.5 text-center h-6 rounded-lg max-w-28 xl:max-w-30",
            )}
          >
            {t("status", { status: status?.label as StatusLabel })}
          </p>
        </div>
        <div
          className="flex gap-4 text-black flex-col bg-gray-200 dark:bg-gray-400 p-4 rounded cursor-pointer"
          onClick={() => {
            router.push(`/${locale}/${ROUTES.BOOKING.INDEX}/${item._id}`);
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
            <div>
              <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-primary shrink-0" />
                <span className="whitespace-normal wrap-break-word min-w-[150px] text-start">
                  {item?.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-primary" />
                {item?.numberPhone}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" /> {formatted}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-primary" /> {item?.timeSlot}
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-primary" />
                {item?.peopleQuantity}
              </div>
            </div>
          </div>

          {item?.notes && (
            <div
              className="text-start bg-gray-200 dark:bg-gray-400 text-black "
              onClick={() => {
                router.push(`/${locale}/${ROUTES.BOOKING.INDEX}/${item._id}`);
              }}
            >
              <p className="text-sm font-bold">{t("note")}</p>
              <p className="text-sm">{item?.notes}</p>
            </div>
          )}
        </div>

        {!STATUS_CONFIRMED.includes(item?.status as string) && (
          <div className="flex gap-4 justify-end z-10">
            {/* <button className="px-2 py-1 rounded text-center hover:bg-primary text-primary-text hover:text-white">
          Edit
        </button> */}
            <button
              onClick={openCanceledModal}
              className="px-2 py-1 rounded text-center bg-primary text-white text-sm hover:scale-105 transition duration-200"
            >
              {t("modal.delete.button")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
