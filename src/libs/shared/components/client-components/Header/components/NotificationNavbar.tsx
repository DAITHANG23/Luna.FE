"use client";
import { useAppDispatch } from "@/libs/redux/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import apiService from "@/api/endpoints/index";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import NotificationDetailNavbar from "@/libs/shared/components/NotificationDetailNavbar";
import { useTranslations } from "next-intl";
import useGetAllNotifications from "@/features/hooks/NotificationBooking/useGetAllNotifications";
import { NotificationModel } from "@/@types/models";

interface NotificationNavbarProps {
  unReadNotificationsQuantities: number;
}

const NotificationNavbar = ({
  unReadNotificationsQuantities,
}: NotificationNavbarProps) => {
  const t = useTranslations("Notification");

  const [hasMounted, setHasMounted] = useState(false);

  const [nextCursor, setNextCursor] = useState("");
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [allNotiData, setAllNotiData] = useState<Array<NotificationModel>>([]);
  const { isMobileSize } = useBreakPoints();
  const [hasMoreNoti, setHasMoreNoti] = useState(true);

  const params = { limit: 5, cursor: nextCursor };
  const { notificationsData, isLoading, refetch } =
    useGetAllNotifications(params);

  const notiData = useMemo(() => {
    return notificationsData ? notificationsData.data.data : [];
  }, [notificationsData]);

  useEffect(() => {
    if (notiData && isSeeMore) {
      setAllNotiData((prev) => [...prev, ...notiData]);
    }
    if (isSeeMore && notificationsData?.nextCursor) {
      setNextCursor(notificationsData?.nextCursor || "");
    }

    if (!notificationsData?.hasMore) {
      setHasMoreNoti(false);
    }
  }, [isSeeMore, notificationsData, notiData]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const dispatch = useAppDispatch();

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      await apiService.notifications.deleteNotification({ id });
      dispatch(getAllNotifications());
    },
    [dispatch]
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    if (!hasMoreNoti) return;
    if (scrollHeight - scrollTop - clientHeight > 8) {
      console.log("NO callAPI");
    }
    if (scrollHeight - scrollTop - clientHeight < 8) {
      console.log("callAPI");

      if (notiData && !isLoading && isSeeMore && hasMoreNoti) {
        // Gọi API để load thêm notifications

        refetch();

        // Sau khi load xong
      }
    }
  }, []);

  const dataList =
    allNotiData.length > 0 ? allNotiData : notificationsData?.data.data;

  console.log("dataList:", dataList);
  if (!hasMounted) return null;

  return (
    <Menu as="div" className="relative mx-3 max-w-2xl z-1000">
      <MenuButton
        type="button"
        className="relative rounded-full hover:bg-primary hover:text-white dark:bg-gray-800 p-1 text-primary-text dark:text-gray-400 dark:hover:text-primary-text focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none cursor-pointer"
      >
        <span className="absolute w-4 h-4.5 text-xs -top-1 left-[16px] rounded-full bg-primary text-white">
          {unReadNotificationsQuantities || 0}
        </span>
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="size-6" />
      </MenuButton>

      <MenuItems
        anchor={isMobileSize ? "bottom" : undefined}
        transition
        className="absolute right-0 z-10 mt-2 w-auto min-w-[300px] max-w-sm origin-top-right rounded-md bg-white dark:bg-gray-800 ring-1 shadow-lg ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="h-125 overflow-y-auto py-1" onScroll={handleScroll}>
          {dataList ? (
            dataList.map((item) => {
              return (
                <MenuItem key={item._id}>
                  <div key={item._id}>
                    <NotificationDetailNavbar
                      item={item}
                      unReadNotificationsQuantities={
                        unReadNotificationsQuantities
                      }
                      handleDeleteNotification={handleDeleteNotification}
                    />
                    <hr className="text-gray-500 my-1" />
                  </div>
                </MenuItem>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500 text-sm h-120">
              <BellIcon className="w-8 h-8 mb-2" />
              <p>{t("noNotifications")}</p>
            </div>
          )}
          {notiData.length >= 5 && (
            <MenuItem as={"div"}>
              <button
                disabled={isLoading}
                className="w-full hover:underline text-primary font-bold text-sm py-2 px-4 disabled:opacity-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSeeMore(true);
                }}
              >
                {isLoading ? "loading..." : t("seeMore")}
              </button>
            </MenuItem>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default NotificationNavbar;
