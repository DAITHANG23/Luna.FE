"use client";
import { NotificationModel } from "@/@types/models";
import { ROUTES } from "@/constants";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";
import { useRouter } from "@/libs/next-intl/navigation";
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
    [checkReadNotification, unReadNotificationsQuantities]
  );

  const NotificationIcon = useMemo(() => {
    switch (item?.type) {
      case "bookingReminder":
        return <BellDotIcon className="h-6 w-6 shrink-0 text-[#CA8A04]" />;
      case "bookingConfirmed":
        return <CheckBadgeIcon className="h-6 w-6 shrink-0 text-[#16a34a]" />;
      case "bookingCanceled":
        return <TriangleAlertIcon className="text-primary h-6 w-6 shrink-0" />;
      case "bookingCompleted":
        return <StarIcon className="h-6 w-6 shrink-0 text-purple-800" />;
      case "bookingInProgress":
        return <CircleDashedIcon className="h-6 w-6 shrink-0 text-[#84a4eb]" />;
      default:
        return <InfoIcon className="h-6 w-6 shrink-0 text-[#84a4eb]" />;
    }
  }, [item]);

  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-start gap-2 rounded-lg p-2",
        isSelected || item.read ? "bg-white dark:bg-gray-900" : getStatusClass(item.type),
        isSelected &&
          "border-primary before:bg-primary mr-4 border before:absolute before:top-2 before:bottom-2 before:left-0 before:w-[6px] before:rounded-tr-lg before:rounded-br-lg before:content-[''] after:absolute after:right-[-8px] after:bottom-[calc(50%-8px)] after:border-t-8 after:border-b-8 after:border-l-8 after:border-transparent after:border-l-red-500 after:content-['']"
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
        <h2 className="text-primary-text text-base font-bold">{item.title}</h2>
        <p className="text-primary-text text-sm text-gray-800">{item.message}</p>
        <p className="text-primary-text text-xs">{formatted}</p>
      </div>
      {!item.read ? (
        <div className="flex items-end justify-end text-end">
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleCheckReadNotification(item._id);
            }}
            className="rounded-full p-1 hover:bg-[#BBF7D0]/90"
          >
            <CheckCheckIcon className="h-4 w-4 shrink-0 text-[#16a34a]" />
          </button>
        </div>
      ) : (
        <div className="flex items-end justify-end text-end">
          <button
            className="hover:bg-error/20 p-1 transition duration-200 hover:scale-105 hover:rounded-[4px]"
            onClick={e => {
              e.stopPropagation();
              handleDeleteNotification(item._id);
            }}
          >
            <Trash2Icon className="text-error h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDetailNavbar;
