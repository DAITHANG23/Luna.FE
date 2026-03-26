"use client";
import useGetAllResevations from "@/features/hooks/BookingHooks/useGetAllResevation";
import { CalendarIcon } from "lucide-react";
import { Spinner } from "@/libs/shared/components";
import { LazyBookingDetail } from "./LazyBookingDetail";
import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/next-intl/navigation";

export const OrderHistory = () => {
  const t = useTranslations("Booking");

  const { resevationsData, isLoading } = useGetAllResevations();

  const router = useRouter();

  if (isLoading)
    return (
      <div className="mt-34">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-34">
      <div className="mx-auto mt-20 w-[90%] p-4 sm:mt-30 xl:w-[60%]">
        <h3 className="text-primary flex items-center justify-start gap-2 text-center">
          <CalendarIcon /> {t("title")}
        </h3>

        <div className="my-10">
          {resevationsData && resevationsData?.data.data.length > 0 ? (
            resevationsData?.data.data?.map((item, index) => (
              <LazyBookingDetail key={item._id} item={item} index={index} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-base">{t("noBooking")}</p>
              <div className="flex gap-2">
                <button
                  className="text-primary text-base font-bold hover:underline"
                  onClick={() => router.push(`/booking-restaurant`)}
                >
                  {t("button.bookingNow")}
                </button>
                {t("contentNoBooking")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
