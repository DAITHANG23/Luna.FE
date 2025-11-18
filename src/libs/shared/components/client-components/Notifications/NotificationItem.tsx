import { NotificationModel } from "@/@types/models";
import NotificationDetailNavbar from "../../NotificationDetailNavbar";
import { memo } from "react";
const NotificationItem = ({
  item,
  isSelected,
  unReadNotificationsQuantities,
  handleDeleteNotification,
  onItemClick,
}: {
  item: NotificationModel;
  isSelected?: boolean;
  unReadNotificationsQuantities: number;
  handleDeleteNotification: (id: string) => void;
  onItemClick?: () => void;
}) => {
  return (
    <div key={item._id} onClick={onItemClick}>
      <NotificationDetailNavbar
        item={item}
        unReadNotificationsQuantities={unReadNotificationsQuantities}
        handleDeleteNotification={handleDeleteNotification}
        isSelected={isSelected}
      />
      <hr className="text-gray-500 my-1!" />
    </div>
  );
};

export default memo(NotificationItem);
