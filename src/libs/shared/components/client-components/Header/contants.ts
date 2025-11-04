import { ROUTES } from "@/constants";

interface DropdownListType {
  name: "yourProfile" | "reservationHistory" | "favorites" | "Settings";
  href: string;
}

interface NavigationType {
  name: string;
  href: "/" | "/about" | "/concepts" | "/blog";
}

export const navigation = [
  { name: "home", href: `${ROUTES.HOME.INDEX}` as const },
  { name: "about", href: `${ROUTES.ABOUT.INDEX}` as const },
  { name: "concepts", href: `${ROUTES.CONCEPTS.INDEX}` as const },
  { name: "blog", href: `${ROUTES.BLOG.INDEX}` as const },
] as Array<NavigationType>;

export const conceptNavigation = [
  { name: "menu", href: "menu" },
  { name: "booking", href: "booking" },
] as Array<{ name: "menu" | "booking"; href: string }>;

export const dropdownList: Array<DropdownListType> = [
  { name: "yourProfile", href: `${ROUTES.PROFILE.INDEX}` },
  { name: "reservationHistory", href: `${ROUTES.BOOKING.INDEX}` },
  { name: "favorites", href: `${ROUTES.FAVORITE_CONCEPTS.INDEX}` },
  { name: "Settings", href: "" },
];
