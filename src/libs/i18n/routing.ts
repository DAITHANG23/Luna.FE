import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/verify-otp": "/verify-otp",
    "/login": {
      en: "/login",
      vi: "/dang-nhap",
    },
    "/about": {
      en: "/about",
      vi: "/gioi-thieu",
    },
    "/concepts": {
      en: "/concepts",
      vi: "/thuong-hieu-nha-hang",
    },
    "/blog": "/blog",
    "/profile": {
      en: "/profile",
      vi: "/thong-tin-ca-nhan",
    },
    "/reservation-history": {
      en: "/reservation-history",
      vi: "/lich-su-dat-ban",
    },
    "/reservation-history/[id]": {
      en: "/reservation-history/[id]",
      vi: "/lich-su-dat-ban/[id]",
    },
    "/favorites": {
      en: "/favorites",
      vi: "/yeu-thich",
    },
    "/favorites/favorite-restaurants": {
      en: "/favorites/favorite-restaurants",
      vi: "/yeu-thich/nha-hang-yeu-thich",
    },
    "/favorites/visited-restaurants": {
      en: "/favorites/visited-restaurants",
      vi: "/yeu-thich/nha-hang-tung-ghe",
    },
    "/register": {
      en: "/register",
      vi: "/dang-ki",
    },
    "/reset-password": {
      en: "/reset-password",
      vi: "/doi-mat-khau",
    },
    "/forgot-password": {
      en: "/forgot-password",
      vi: "/quen-mat-khau",
    },
    "/notifications": {
      en: "/notifications",
      vi: "/thong-bao",
    },
    "/notifications?noti_selected=[id]": {
      en: "/notifications?noti_selected=[id]",
      vi: "/thong-bao?tin-nhan-duoc-chon=[id]",
    },
    "/notifications?noti_selected=[nextIdNotifcation]": {
      en: "/notifications?noti_selected=[nextIdNotifcation]",
      vi: "/thong-bao?tin-nhan-duoc-chon=[nextIdNotifcation]",
    },

    "/not-found": "/not-found",

    "/unauthorized": "/unauthorized",
  },
});
