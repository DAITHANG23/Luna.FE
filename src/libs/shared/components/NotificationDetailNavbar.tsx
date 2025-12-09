"use client";
import { NotificationModel } from "@/@types/models";
import { ROUTES } from "@/constants";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";
import { useRouter } from "@/libs/i18n/navigation";
import { cn, getStatusClass } from "@/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import {
  CheckCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  BellDotIcon,
  Trash2Icon,
  StarIcon,
  CircleDashedIcon,
} from "lucide-react";
import React, { useCallback, useMemo } from "react";

interface NotificationDetailNavbarProps {
  item: NotificationModel;
  unReadNotificationsQuantities: number;
  handleDeleteNotification: (id: string) => void;
  isSelected?: boolean;
}
const NotificationDetailNavbar = ({
  item,
  unReadNotificationsQuantities,
  handleDeleteNotification,
  isSelected,
}: NotificationDetailNavbarProps) => {
  const router = useRouter();
  const date = new Date(item.createdAt);

  const formatted = format(date, "dd/MM/yyyy HH:mm");
  const { mutate: checkReadNotification } = useCheckReadNotification();

  const handleCheckReadNotification = useCallback(
    (id: string) => {
      if (unReadNotificationsQuantities > 0) checkReadNotification(id);
    },
    [checkReadNotification, unReadNotificationsQuantities],
  );

  const NotificationIcon = useMemo(() => {
    switch (item?.type) {
      case "bookingReminder":
        return <BellDotIcon className="text-[#CA8A04] w-6 h-6 shrink-0" />;
      case "bookingConfirmed":
        return <CheckBadgeIcon className="text-[#16a34a] w-6 h-6 shrink-0" />;
      case "bookingCanceled":
        return <TriangleAlertIcon className="text-primary w-6 h-6 shrink-0" />;
      case "bookingCompleted":
        return <StarIcon className="text-purple-800 w-6 h-6 shrink-0" />;
      case "bookingInProgress":
        return <CircleDashedIcon className="text-[#2563EB] w-6 h-6 shrink-0" />;
      default:
        return <InfoIcon className="text-[#2563EB] w-6 h-6 shrink-0" />;
    }
  }, [item]);

  return (
    <div
      className={cn(
        "relative flex gap-2 items-start p-2 cursor-pointer rounded-lg",
        isSelected || item.read
          ? "bg-white dark:bg-gray-900"
          : getStatusClass(item.type),
        isSelected &&
          " mr-4 border border-primary before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[6px] before:rounded-tr-lg before:rounded-br-lg before:bg-primary after:content-[''] after:absolute after:right-[-8px] after:bottom-[calc(50%-8px)] after:border-t-8 after:border-b-8 after:border-l-8 after:border-transparent after:border-l-red-500",
      )}
    >
      {NotificationIcon}
      <div
        className="flex flex-col gap-4 text-start"
        onClick={() => {
          router.push({
            pathname: `${ROUTES.NOTIFICATIONS.INDEX}`,
            query: { noti_selected: item._id },
          });
          handleCheckReadNotification(item._id);
        }}
      >
        <h2 className="text-base font-bold text-primary-text">{item.title}</h2>
        <p className="text-gray-800 text-sm text-primary-text">
          {item.message}
        </p>
        <p className="text-xs text-primary-text">{formatted}</p>
      </div>
      {!item.read ? (
        <div className="flex justify-end items-end text-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCheckReadNotification(item._id);
            }}
            className="p-1 hover:bg-[#BBF7D0]/90 rounded-full"
          >
            <CheckCheckIcon className="text-[#16a34a] w-4 h-4 shrink-0" />
          </button>
        </div>
      ) : (
        <div className="flex justify-end items-end text-end">
          <button
            className="p-1 hover:bg-error/20 hover:rounded-[4px] hover:scale-105 transition duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNotification(item._id);
            }}
          >
            <Trash2Icon className="text-error w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDetailNavbar;
