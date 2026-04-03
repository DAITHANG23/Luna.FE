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
  const { notify, types } = useNotification();

  const { mutateAsync: updateReservation } = useUpdateReservation();
  const concept = useMemo(() => {
    return CONCEPTS_ROUTES.find(
      c => c.name === item?.restaurant?.concept?.name
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

    notify(t("notification.canceled"), { type: types.success });
    setIsOpenCanceledModal(false);
  };

  const formatted = dayjs(item?.timeOfBooking).format("DD/MM/YYYY");

  const status = useMemo(() => {
    if (item?.status) {
      return STATUS_BOOKING.find(s => s.status === item.status);
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
              className="bg-primary/80 hover:bg-primary/90 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto"
              onClick={handleCanceledReservation}
            >
              {t("modal.delete.button")}
            </button>
          }
        />
      )}
      <div className="mb-5 flex flex-col justify-between gap-5 rounded-lg bg-white p-5 text-center shadow-xl transition-all duration-200 hover:-translate-y-0.5 dark:bg-gray-800">
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex items-center justify-start gap-4 text-start">
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
              "h-6 max-w-28 rounded-lg px-2.5 py-1 text-center text-xs font-semibold xl:max-w-30"
            )}
          >
            {t("status", { status: status?.label as StatusLabel })}
          </p>
        </div>
        <div
          className="flex cursor-pointer flex-col gap-4 rounded bg-gray-200 p-4 text-black dark:bg-gray-400"
          onClick={() => {
            router.push(`/${locale}${ROUTES.BOOKING.INDEX}/${item._id}`);
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
            <div>
              <div className="flex items-center gap-2">
                <MailIcon className="text-primary h-4 w-4 shrink-0" />
                <span className="min-w-[150px] text-start wrap-break-word whitespace-normal">
                  {item?.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="text-primary h-4 w-4" />
                {item?.numberPhone}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-primary h-4 w-4" /> {formatted}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="text-primary h-4 w-4" /> {item?.timeSlot}
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="text-primary h-4 w-4" />
                {item?.peopleQuantity}
              </div>
            </div>
          </div>

          {item?.notes && (
            <div
              className="bg-gray-200 text-start text-black dark:bg-gray-400"
              onClick={() => {
                router.push(`/${locale}${ROUTES.BOOKING.INDEX}/${item._id}`);
              }}
            >
              <p className="text-sm font-bold">{t("note")}</p>
              <p className="text-sm">{item?.notes}</p>
            </div>
          )}
        </div>

        {!STATUS_CONFIRMED.includes(item?.status as string) && (
          <div className="z-10 flex justify-end gap-4">
            {/* <button className="px-2 py-1 rounded text-center hover:bg-primary text-primary-text hover:text-white">
          Edit
        </button> */}
            <button
              onClick={openCanceledModal}
              className="bg-primary rounded px-2 py-1 text-center text-sm text-white transition duration-200 hover:scale-105"
            >
              {t("modal.delete.button")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
