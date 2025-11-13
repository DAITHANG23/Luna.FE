"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  UserIcon,
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import {
  dropdownList,
  navigation,
} from "@/libs/shared/components/client-components/Header/contants";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { RootState } from "@/libs/redux/store";
import {
  sessionId,
  authentication,
  logout,
  userInfo,
} from "@/libs/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { DEFAULT_AVATAR, ROUTES } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import socket from "@/features/notification/socket";
import {
  getAllNotifications,
  resetNotifications,
  unReadNotifications,
} from "@/libs/redux/masterDataSlice";
import { NotificationModel } from "@/@types/models";
import NotificationNavbar from "./NotificationNavbar";
import { LanguageSelect } from "@/libs/shared/components";
import { ChevronDownIcon } from "lucide-react";
import {
  GET_BOOKING_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@/app/constants/queryKeys";
import { Locale, useTranslations } from "next-intl";
import { useRouter } from "@/libs/i18n/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const events = [
  "bookingCreated",
  "bookingCanceled",
  "bookingConfirmed",
  "bookingReminder",
  "bookingCompleted",
  "bookingInProgress",
];

const Navbars = () => {
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname.split("/")[1] as Locale;
  const hrefPath =
    pathname.split("/").length > 2 ? `/${pathname.split("/")[2]}` : "/";

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector((state) => state.auth.accountInfo);

  const unReadNotificationsQuantities = useAppSelector(
    (state) => state.masterData.unReadNotificationsQuantity
  );

  const { setIsOpenDialog } = useAppContext();
  const sessionIdState = useAppSelector(
    (state: RootState) => state.auth.sessionId
  );
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { isMobileSize } = useBreakPoints();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const t = useTranslations("Translation");
  const [itemNavbar, setItemNavbar] = useState("");

  useEffect(() => {
    setItemNavbar(hrefPath);
  }, [hrefPath]);

  useEffect(() => {
    const handleBookingEvent = (data: NotificationModel) => {
      if (data) {
        dispatch(
          unReadNotifications({
            unReadNotificationsQuantity: unReadNotificationsQuantities + 1,
          })
        );
        dispatch(getAllNotifications());
        queryClient.invalidateQueries({ queryKey: [GET_BOOKING_KEY] });
      }
    };

    events.forEach((event) => {
      socket.on(event, handleBookingEvent);
    });

    return () => {
      events.forEach((event) => {
        socket.off(event, handleBookingEvent);
      });
    };
  }, [dispatch, unReadNotificationsQuantities, queryClient]);

  const handleSignOut = async () => {
    dispatch(sessionId({ sessionId: "" }));
    dispatch(userInfo({ accountInfo: null }));
    dispatch(unReadNotifications({ unReadNotificationsQuantity: 0 }));
    dispatch(resetNotifications());
    dispatch(logout(locale));
    dispatch(authentication({ isAuthenticated: false }));
    localStorage.removeItem("isLoggedInGoogle");
    queryClient.removeQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
  };

  if (!hasMounted) return null;

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "fixed top-0 left-0 p-0 sm:p-4 lg:p-5 w-full bg-white dark:bg-gray-800 shadow-glass z-10"
      )}
    >
      <div className="sm:w-[90%] mx-auto max-w-7xl lg:px-8 content-center text-center">
        <div className="relative flex h-16 items-center justify-between al">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-primary hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {!open ? (
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
              ) : (
                <BarsArrowDownIcon
                  aria-hidden="true"
                  className="block size-6 group-data-open:block"
                />
              )}
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href={"/"}>
                {isMobileSize ? (
                  <Image
                    alt="Your Company"
                    src="/favicon.ico"
                    height={40}
                    width={40}
                    className="rounded-sm"
                  />
                ) : (
                  <Image
                    alt="Your Company"
                    src="/assets/images/logo.png"
                    height={40}
                    width={130}
                    className="rounded-sm"
                  />
                )}
              </Link>
            </div>
            <div className="hidden lg:ml-20 lg:block content-center">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={`/${locale}/${item.href}`}
                    className={clsx(
                      itemNavbar === item.href || itemNavbar === item.hrefVnLang
                        ? "bg-primary dark:bg-gray-900 text-white"
                        : "text-primary-text dark:text-gray-300 hover:bg-primary dark:hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium flex items-center justify-center"
                    )}
                    onClick={() => setItemNavbar(item.href as typeof pathname)}
                  >
                    <p className="text-[16px]">
                      {t("navbar.item", { item: item.name })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="mt-2">
              <NotificationNavbar
                unReadNotificationsQuantities={unReadNotificationsQuantities}
              />
            </div>

            <button
              className="cursor-pointer hover:bg-gray-200 rounded-full p-2"
              onClick={() => setIsOpenDialog((prev) => !prev)}
            >
              <Cog6ToothIcon className="w-7 h-7 animate-[spin_8s_linear_infinite] text-primary" />
            </button>

            <LanguageSelect />

            {/* Profile dropdown */}
            {sessionIdState ? (
              <Menu as="div" className="relative ml-3 ">
                <div>
                  <MenuButton className="relative flex rounded-full hover:ring-offset-primary/80 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt="avatar"
                      src={accountInfo?.data?.data.avatarUrl || DEFAULT_AVATAR}
                      className="size-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <ChevronDownIcon className="w-3 h-3 absolute bottom-[2px] right-0 bg-gray-300 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute min-w-[240px] right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
                >
                  {dropdownList.map((item) => {
                    return (
                      <MenuItem key={item.name}>
                        <button
                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                          onClick={() => {
                            if (item.name === "Settings") {
                              return setIsOpenDialog((prev) => !prev);
                            }
                          }}
                        >
                          {item.name !== "Settings" ? (
                            <Link
                              href={`/${locale}/${item.href}`}
                              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300"
                            >
                              {item.name === "yourProfile" ? (
                                <UserIcon className="w-5 h-5" />
                              ) : item.name === "favorites" ? (
                                <HeartIcon className="w-5 h-5" />
                              ) : (
                                <ArchiveBoxIcon className="w-5 h-5" />
                              )}
                              <p className="prose">
                                {t(`navbar.${item.name}`)}
                              </p>
                            </Link>
                          ) : (
                            <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300">
                              <Cog6ToothIcon className="w-5 h-5" />
                              <p className="prose">{t(`navbar.settings`)}</p>
                            </div>
                          )}
                        </button>
                      </MenuItem>
                    );
                  })}
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                      onClick={handleSignOut}
                    >
                      <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300">
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                        <p className="prose">{t(`navbar.signOut`)}</p>
                      </div>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                onClick={() => router.replace(`${ROUTES.LOGIN.INDEX}`)}
                className="ml-2 border-none px-4 py-1 bg-primary rounded-lg text-white font-bold transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
              >
                {t(`navbar.login`)}
              </button>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 flex items-center justify-center flex-col">
          <DisclosureButton
            className="flex justify-end items-end w-full text-end pr-2 z-100"
            onClick={() => setOpen(false)}
          >
            <button>
              <XMarkIcon
                aria-hidden="true"
                className="block size-6 group-data-open:block"
              />
            </button>
          </DisclosureButton>
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              className={clsx(
                itemNavbar === item.href || itemNavbar === item.hrefVnLang
                  ? "bg-primary dark:bg-gray-900 text-white"
                  : "text-primary-text dark:text-gray-300 hover:bg-primary dark:hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium "
              )}
            >
              <Link
                href={`/${locale}/${item.name}`}
                onClick={() => {
                  setItemNavbar(item.href as typeof pathname);
                }}
                className="flex items-center justify-center"
              >
                {t("navbar.item", { item: item.name })}
              </Link>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbars;
