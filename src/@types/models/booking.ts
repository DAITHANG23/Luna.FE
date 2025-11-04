import { BookingStatus, RestaurantModel } from "./restaurant";

export interface StatusHistory {
  status: string;
  updatedAt: Date;
  updateBy: string;
}

export interface BookingModel {
  _id: string;
  customer?: string;
  restaurant?: RestaurantModel;
  timeOfBooking?: string;
  timeSlot?: string;
  fullName?: string;
  numberPhone?: string;
  email?: string;
  peopleQuantity?: string;
  notes?: string;
  status?: BookingStatus;
  createdAt?: Date;
  statusHistory?: Array<StatusHistory>;
  _updateBy?: string;
  isReaded?: boolean;
}

export interface AllResevationResponse {
  status: string;
  results: number;
  data: { data: Array<BookingModel> };
}

export interface BookingResponse {
  status: string;
  data: { data: BookingModel };
}
