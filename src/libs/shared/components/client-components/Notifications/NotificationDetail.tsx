"use client";
import React, { useMemo, useState } from "react";
import useGetNotificationItem from "@/features/hooks/NotificationBooking/useGetNotificationItem";
import { useAppSelector } from "@/libs/redux/hooks";
import { PhoneIcon, MapPinHouseIcon } from "lucide-react";
import { ConceptModel } from "@/@types/models";
import { Modal, Review, Spinner } from "@/libs/shared/components";
import { NotificationMain } from "@shared/components/client-components/Notifications";
import { useTranslations } from "next-intl";

interface NotificationDetailProps {
  id: string;
}

export const NotificationDetail = ({ id }: NotificationDetailProps) => {
  const t = useTranslations("Notification");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const accountInfo = useAppSelector((state) => state.auth.accountInfo)?.data
    .data;

  const { notificationData, isLoading } = useGetNotificationItem(id as string);

  const dataNotification = notificationData?.data.data;

  const concept = useMemo(() => {
    return dataNotification?.restaurant.concept || [];
  }, [dataNotification]);

  const contentNotificaiton = useMemo(() => {
    if (dataNotification?.type === "bookingCreated") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("content.bookingCreated.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("content.bookingCreated.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            {t("content.bookingCreated.detail.content_4")}
          </p>
          <p>{t("content.bookingCreated.detail.content_5")}</p>
          <p>{t("content.bookingCreated.detail.content_6")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingConfirmed") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("content.bookingConfirmed.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("content.bookingConfirmed.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            {t("content.bookingCreated.detail.content_4")}
          </p>
          <p>{t("content.bookingConfirmed.detail.content_3")}</p>
          <p>{t("content.bookingConfirmed.detail.content_4")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingCanceled") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("content.bookingCanceled.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("content.bookingCanceled.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
          </p>
          <p>{t("content.bookingCanceled.detail.content_3")}</p>
          <p>{t("content.bookingCanceled.detail.content_4")}</p>
          <p>{t("content.bookingCanceled.detail.content_5")}</p>
        </div>
      );
    }
    if (dataNotification?.type === "bookingReminder") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("content.bookingReminder.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("content.bookingCreated.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            {t("content.bookingCreated.detail.content_4")}
          </p>
          <p>{t("content.bookingReminder.detail.content_2")}</p>
          <p>{t("content.bookingReminder.detail.content_3")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingInProgress") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("content.bookingInProgress.detail.content_1")}{" "}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}.
            </span>
          </p>
          <p>
            <span className="pl-1">
              {t("content.bookingCompleted.detail.content_2")}
            </span>
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            <span className="pr-1">
              {t("content.bookingCompleted.detail.content_7")}
            </span>
            {t("content.bookingInProgress.detail.content_2")}
          </p>
          <p>{t("content.bookingInProgress.detail.content_3")}</p>

          <p>{t("content.bookingInProgress.detail.content_4")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingCompleted") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("content.bookingCompleted.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            .
            <span className="pl-1">
              {t("content.bookingCompleted.detail.content_2")}
            </span>
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            <span className="pr-1">
              {t("content.bookingCompleted.detail.content_7")}
            </span>
            {t("content.bookingCompleted.detail.content_3")}
          </p>
          <p>{t("content.bookingCompleted.detail.content_4")}</p>
          <p
            className="text-primary hover:underline cursor-pointer"
            onClick={() => setIsOpenModal(true)}
          >
            👉 {t("content.bookingCompleted.detail.content_6")}
          </p>
          <p>{t("content.bookingCompleted.detail.content_5")}</p>
        </div>
      );
    }
  }, [dataNotification, accountInfo, t]);

  return (
    <div className="mt-[50px] lg:mt-[100px]">
      <Modal open={isOpenModal} setOpen={setIsOpenModal}>
        <Review
          concept={concept as ConceptModel}
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
        />
      </Modal>
      <NotificationMain id={id}>
        {!isLoading ? (
          <div className="lg:mt-[50px] p-4 flex flex-col gap-6 text-primary-text">
            {contentNotificaiton}

            <hr className="text-gray-500" />

            <div>
              <p className="text-base font-bold">{t("infoRestaurant")}</p>
              <p className="text-sm pt-3">
                {dataNotification?.restaurant.name}
              </p>
              <p className="flex text-sm pt-3 gap-2 items-center">
                <MapPinHouseIcon className="text-primary w-5 h-5 flex-shrink-0" />
                {dataNotification?.restaurant.address}
              </p>
              <p className="flex text-sm pt-3 gap-2 items-center">
                <PhoneIcon className="text-primary w-5 h-5 flex-shrink-0" />
                {dataNotification?.restaurant.numberPhone}
              </p>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </NotificationMain>
    </div>
  );
};
