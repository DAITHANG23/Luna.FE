"use client";
import { ROUTES } from "@/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BookingNow = () => {
  const t = useTranslations("Home");
  const router = useRouter();
  return (
    <div className="bg-primary mx-auto grid h-[500px] w-full grid-cols-1 p-4 md:grid-cols-2 md:p-8 dark:bg-[#1C252E]">
      <div className="relative mx-auto flex h-full w-full items-center justify-center text-center">
        <Image
          src={
            "https://res.cloudinary.com/dn797d3j3/image/upload/v1774584909/Website_PostImage_w3j9tx.jpg"
          }
          alt="booking-now"
          fill
          className="rounded-md"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="dark:bg-primary rounded-lg bg-[#1C252E] px-4 py-3 text-center text-xl font-bold text-white transition duration-300 hover:scale-105 md:text-3xl"
          onClick={() => router.push(ROUTES.BOOKING_RESTAURANT.INDEX)}
        >
          {t("bookingNow")}
        </button>
      </div>
    </div>
  );
};
