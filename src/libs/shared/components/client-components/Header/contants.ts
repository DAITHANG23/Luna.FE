import { ROUTES } from "@/constants";

interface DropdownListType {
  name: "yourProfile" | "reservationHistory" | "favorites" | "Settings";
  href: string;
}

interface NavigationType {
  name: string;
  href: "/" | "/about" | "/booking-restaurant" | "/blog";
  hrefVnLang: "/" | "/gioi-thieu" | "/dat-ban-nha-hang" | "/blog";
}

export const navigation = [
  { name: "home", href: `${ROUTES.HOME.INDEX}` as const, hrefVnLang: "/" },
  {
    name: "about",
    href: `${ROUTES.ABOUT.INDEX}` as const,
    hrefVnLang: "/gioi-thieu",
  },
  {
    name: "booking",
    href: `${ROUTES.BOOKING_RESTAURANT.INDEX}` as const,
    hrefVnLang: "/dat-ban-nha-hang",
  },
  { name: "blog", href: `${ROUTES.BLOG.INDEX}` as const, hrefVnLang: "/blog" },
] as Array<NavigationType>;

export const conceptNavigation = [
  { name: "menu", href: "/menu" },
  { name: "booking", href: "/booking" },
] as Array<{ name: "menu" | "booking"; href: string }>;

export const dropdownList: Array<DropdownListType> = [
  { name: "yourProfile", href: `${ROUTES.PROFILE.INDEX}` },
  { name: "reservationHistory", href: `${ROUTES.BOOKING.INDEX}` },
  { name: "favorites", href: `${ROUTES.FAVORITE_CONCEPTS.INDEX}` },
  { name: "Settings", href: "" },
];
