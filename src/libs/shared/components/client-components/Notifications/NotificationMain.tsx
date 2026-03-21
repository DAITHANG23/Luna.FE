/* eslint-disable react-hooks/static-components */
/* eslint-disable react/display-name */
"use client";
import { NotificationModel } from "@/@types/models";
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
import useDeleteNotification from "@/features/hooks/NotificationBooking/useDeleteNotification";

interface NotificationMainProps {
  children: React.ReactNode;
  id?: string;
}

export const NotificationMain = ({ children, id }: NotificationMainProps) => {
  const router = useRouter();

  const t = useTranslations("Notification");
  const allNotifications = useAppSelector(state => state.masterData.allNotifications)?.data.data;

  const unReadNotificationsQuantities = useAppSelector(
    state => state.masterData.unReadNotificationsQuantity
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
    [router]
  );

  const dispatch = useAppDispatch();

  const { mutate: checkReadNotification } = useCheckReadNotification();

  const { mutate: deleteNotification } = useDeleteNotification();

  const handleAfterDeleteNotification = useCallback(
    (id: string) => {
      const index = allNotifications?.findIndex(
        (notification: NotificationModel) => notification._id === id
      );
      const newList = allNotifications?.filter(n => n._id !== id);

      if (selectedId === id) {
        const nextIdNotifcation = newList?.[index!]?._id;
        setSelectedId(nextIdNotifcation || null);

        router.push(
          nextIdNotifcation
            ? {
                pathname: `${ROUTES.NOTIFICATIONS.INDEX}`,
                query: { noti_selected: id },
              }
            : ROUTES.NOTIFICATIONS.INDEX
        );
        checkReadNotification(nextIdNotifcation || "");
      }
    },
    [allNotifications, selectedId, router, checkReadNotification]
  );

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      // try {
      //   await apiService.notifications.deleteNotification({ id });
      //   dispatch(getAllNotifications());

      //   handleAfterDeleteNotification(id);
      // } catch (error) {
      //   console.error("Failed to delete notification:", error);
      // }

      deleteNotification(id, {
        onSuccess: () => {
          dispatch(getAllNotifications());
          setTimeout(() => {
            handleAfterDeleteNotification(id);
          }, 1000);
        },
      });
    },
    [deleteNotification, handleAfterDeleteNotification, dispatch]
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
            <div className="flex h-120 flex-col items-center justify-center py-10 text-center text-sm text-gray-500">
              <BellIcon className="mb-2 h-8 w-8" />
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
    ]
  );
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <div className="mx-auto my-4 mt-20 h-auto w-[90%] rounded-lg bg-white p-4 shadow-lg sm:mt-30 lg:h-160 lg:py-4 lg:pr-4 2xl:w-[70%] dark:bg-gray-900">
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        <div className="hidden h-full w-full overflow-auto lg:block lg:w-[30%]">
          <NotificationsNavbar />
        </div>
        <div className="block lg:hidden">
          <WrapperFilter classNameMenu={"h-152! overflow-auto scrollbar-hide"} isHandleCloseMenu>
            <NotificationsNavbar />
          </WrapperFilter>
        </div>

        <div className="w-full lg:w-[70%]">{memoizedChildren}</div>
      </div>
    </div>
  );
};
