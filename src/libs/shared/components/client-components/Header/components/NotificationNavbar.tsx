"use client";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import apiService from "@/api/endpoints/index";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import NotificationDetailNavbar from "@/libs/shared/components/NotificationDetailNavbar";
import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/next-intl/navigation";
import { ROUTES } from "@/constants";

interface NotificationNavbarProps {
  unReadNotificationsQuantities: number;
}
const NotificationNavbar = ({ unReadNotificationsQuantities }: NotificationNavbarProps) => {
  const router = useRouter();
  const t = useTranslations("Notification");
  const allNotifications = useAppSelector(state => state.masterData.allNotifications)?.data.data;
  const [hasMounted, setHasMounted] = useState(false);

  const { isMobileSize } = useBreakPoints();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  if (!hasMounted) return null;

  return (
    <Menu as="div" className="relative z-1000 mx-3 max-w-2xl!">
      <div>
        <MenuButton
          type="button"
          className="hover:bg-primary text-primary-text dark:hover:text-primary-text relative cursor-pointer rounded-full p-1 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden dark:bg-gray-800 dark:text-gray-400"
        >
          <span className="bg-primary absolute -top-1 left-[16px] h-4.5 w-4 rounded-full text-xs text-white">
            {unReadNotificationsQuantities || 0}
          </span>
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </MenuButton>
      </div>
      <MenuItems
        anchor={isMobileSize ? "bottom" : undefined}
        transition
        className="absolute right-0 z-10 mt-2 h-125 w-auto max-w-sm min-w-[300px] origin-top-right overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800"
      >
        {allNotifications && allNotifications?.length > 0 ? (
          allNotifications.slice(0, 5).map(item => {
            return (
              <MenuItem key={item._id}>
                <div key={item._id}>
                  <NotificationDetailNavbar
                    item={item}
                    unReadNotificationsQuantities={unReadNotificationsQuantities}
                    handleDeleteNotification={handleDeleteNotification}
                  />
                  <hr className="my-1 text-gray-500" />
                </div>
              </MenuItem>
            );
          })
        ) : (
          <div className="flex h-120 flex-col items-center justify-center py-10 text-center text-sm text-gray-500">
            <BellIcon className="mb-2 h-8 w-8" />
            <p>{t("noNotifications")}</p>
          </div>
        )}
        {allNotifications && allNotifications?.length > 5 && (
          <MenuItem>
            <button
              className="text-primary w-full text-sm font-bold hover:underline"
              onClick={() => {
                router.push(ROUTES.NOTIFICATIONS.INDEX);
              }}
            >
              {t("seeMore")}
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};

export default NotificationNavbar;
