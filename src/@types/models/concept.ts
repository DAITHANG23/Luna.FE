import { UserModel } from "./account";

export type DishType = "alacarte" | "Buffet" | "Combo";

export interface ItemsDish {
  _id: string;
  name: string;
  image?: string;
  images?: Array<string>;
  price: number;
}
export interface Dish {
  name: string;
  type: DishType;
  images?: Array<string>;
  image?: string;
  price: number;
  category?: string;
  items?: Array<ItemsDish>;
}

export interface Restaurant {
  name: string;
  img1: string;
  img2: string;
  url: string;
  width: number;
  height: number;
}
export interface RestaurantsConceptType {
  type: string;
  items: Array<Restaurant>;
}

export interface TimeSlotType {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface ConceptModel {
  _id: string;
  name: string;
  description: string;
  address: string;
  conceptManager: UserModel;
  totalProfit: number;
  images: Array<string>;
  imageCover: string;
  timeSlot: TimeSlotType;
  dishes: Array<Dish>;
  type: string;
  avgRatings: number;
  reviews: Array<string>;
  banners: Array<string>;
  title: string;
  active: boolean;
  voucher: string;
  price: Array<number>;
}

export interface ReviewPost {
  conceptId: string;
  score: number;
  content: string;
}

export interface AllConceptsResponse {
  data: { data: Array<ConceptModel> };
  status: string;
  results: number;
}

export interface ConceptResponse {
  data: { data: ConceptModel };
  status: string;
}
export interface IOptions {
  label: string;
  value: string | number;
}

export type ConceptsType =
  | "hotpot"
  | "other"
  | "japanese"
  | "bbq"
  | "steakHouse";
export type IConcepts = ConceptsType | "All";
export interface ConceptsFilter {
  searchText: string;
  concepts: IConcepts;
  price: string;
  star: string;
}

export interface FavoriteConcepts {
  idConcept: string;
  userId: string;
}

export interface GetFavoriteConcepts {
  userId: string;
}

export interface ConceptsFavoriteResponse
  extends Partial<AllConceptsResponse> {}
