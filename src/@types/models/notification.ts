import { UserModel } from "./account";
import { RestaurantModel } from "./restaurant";

export interface NotificationModel {
  _id: string;
  title: string;
  message: string;
  recipient: UserModel;
  read: boolean;
  createdAt: Date;
  type: string;
  restaurant: RestaurantModel;
  numberOfGuests: string;
  bookingDate: string;
}

export interface AllNotificationResponse {
  status: string;
  results: number;
  data: { data: Array<NotificationModel> };
  nextCursor?: string;
  hasMore?: boolean;
}

export interface CheckNotification {
  status: string;
  data: { data: NotificationModel };
}
