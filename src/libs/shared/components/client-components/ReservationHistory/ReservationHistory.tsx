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
      <div className="mt-20 sm:mt-30 w-[90%] xl:w-[60%] mx-auto p-4 ">
        <h3 className="flex text-center justify-start items-center gap-2 text-primary">
          <CalendarIcon /> {t("title")}
        </h3>

        <div className="my-10">
          {resevationsData && resevationsData?.data.data.length > 0 ? (
            resevationsData?.data.data?.map((item, index) => (
              <LazyBookingDetail key={item._id} item={item} index={index} />
            ))
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center text-center">
              <p className="text-base">{t("noBooking")}</p>
              <div className="flex gap-2">
                <button
                  className="text-primary hover:underline text-base font-bold"
                  onClick={() => router.push(`/concepts`)}
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
