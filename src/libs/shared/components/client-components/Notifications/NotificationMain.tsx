/* eslint-disable react-hooks/static-components */
/* eslint-disable react/display-name */
"use client";
import { NotificationModel } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { ROUTES } from "@/constants";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";
import { useRouter } from "@/libs/next-intl/navigation";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import { WrapperFilter } from "@/libs/shared/components";
import { BellIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import NotificationItem from "./NotificationItem";

interface NotificationMainProps {
  children: React.ReactNode;
  id?: string;
}

export const NotificationMain = ({ children, id }: NotificationMainProps) => {
  const router = useRouter();

  const t = useTranslations("Notification");
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications,
  )?.data.data;

  const unReadNotificationsQuantities = useAppSelector(
    (state) => state.masterData.unReadNotificationsQuantity,
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id) setSelectedId(id as string);
  }, [id]);

  const handleClick = useCallback(
    (id: string) => {
      setSelectedId(id);
      router.push({
        pathname: `${ROUTES.NOTIFICATIONS.INDEX}`,
        query: { noti_selected: id },
      });
    },
    [router],
  );

  const dispatch = useAppDispatch();

  const { mutate: checkReadNotification } = useCheckReadNotification();

  const handleAfterDeleteNotification = useCallback(
    (id: string) => {
      const index = allNotifications?.findIndex(
        (notification: NotificationModel) => notification._id === id,
      );
      const newList = allNotifications?.filter((n) => n._id !== id);

      if (selectedId === id) {
        const nextIdNotifcation = newList?.[index!]?._id;
        setSelectedId(nextIdNotifcation || null);

        router.push(
          nextIdNotifcation
            ? {
                pathname: `${ROUTES.NOTIFICATIONS.INDEX}`,
                query: { noti_selected: id },
              }
            : ROUTES.NOTIFICATIONS.INDEX,
        );
        checkReadNotification(nextIdNotifcation || "");
      }
    },
    [allNotifications, selectedId, router, checkReadNotification],
  );

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      try {
        await apiService.notifications.deleteNotification({ id });
        dispatch(getAllNotifications());

        handleAfterDeleteNotification(id);
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    },
    [dispatch, handleAfterDeleteNotification],
  );

  const NotificationsNavbar = useMemo(
    () =>
      memo(() => (
        <div>
          {allNotifications && allNotifications?.length > 0 ? (
            allNotifications?.map((item: NotificationModel) => {
              return (
                <NotificationItem
                  key={item._id}
                  item={item}
                  isSelected={selectedId === item._id}
                  unReadNotificationsQuantities={unReadNotificationsQuantities}
                  handleDeleteNotification={handleDeleteNotification}
                  onItemClick={() => handleClick(item._id)}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500 text-sm h-120">
              <BellIcon className="w-8 h-8 mb-2" />
              <p>{t("noNotifications")}</p>
            </div>
          )}
        </div>
      )),
    [
      allNotifications,
      unReadNotificationsQuantities,
      handleDeleteNotification,
      selectedId,
      t,
      handleClick,
    ],
  );
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <div className="mt-20 sm:mt-30 w-[90%] 2xl:w-[70%] h-auto lg:h-160 mx-auto bg-white dark:bg-gray-900 rounded-lg my-4 shadow-lg p-4 lg:py-4 lg:pr-4">
      <div className="flex lg:flex-row flex-col gap-4 h-full">
        <div className="w-full lg:w-[30%] h-full overflow-auto hidden lg:block">
          <NotificationsNavbar />
        </div>
        <div className="block lg:hidden">
          <WrapperFilter
            classNameMenu={"h-152! overflow-auto scrollbar-hide"}
            isHandleCloseMenu
          >
            <NotificationsNavbar />
          </WrapperFilter>
        </div>

        <div className="w-full lg:w-[70%]">{memoizedChildren}</div>
      </div>
    </div>
  );
};
