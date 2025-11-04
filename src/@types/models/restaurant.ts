export interface ILocation {
  lng: number;
  lat: number;
  address: string;
}

export interface ConceptBooking {
  _id: string;
  name: string;
  imageCover: string;
}

export interface RestaurantModel {
  id: string;
  name: string;
  address: string;
  numberPhone: string;
  concept: ConceptBooking;
  bookingManager: string;
  staffs: string;
  active: boolean;
  location: ILocation;
  profit: number;
  totalSale: number;
  totalExpense: number;
  timeSlot: Array<{ startTime: string; endTime: string; available: boolean }>;
}

export interface AllRestaurantResponse {
  status: string;
  results: number;
  data: { data: Array<RestaurantModel> };
}

export interface AllRestaurantResponseOfConcept {
  status: string;
  results: number;
  data: { restaurants: Array<RestaurantModel> };
}

export interface RestaurantBooking {
  timeOfBooking: string;
  timeSlot: string;
  fullName: string | undefined;
  numberPhone: string | undefined;
  email: string | undefined;
  peopleQuantity: string | undefined;
  notes: string;
  restaurant?: string;
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED_BY_USER"
  | "CANCELLED_BY_ADMIN"
  | "NO_SHOW";

export interface RestaurantBookingResponse extends Partial<RestaurantBooking> {
  status: BookingStatus;
}

export interface RestaurantSearchParams {
  searchText: string;
}
