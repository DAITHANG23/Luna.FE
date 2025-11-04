"use client";
import { useInView } from "react-intersection-observer";
import { BookingModel } from "@/@types/models/booking";
import { motion } from "framer-motion";
import { BookingDetail } from "./BookingDetail";

export const LazyBookingDetail = ({
  item,
  index,
}: {
  item: BookingModel;
  index: number;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="mb-6 min-h-[150px]">
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BookingDetail item={item} />
        </motion.div>
      ) : (
        <div className="w-full h-[150px] bg-gray-100 animate-pulse rounded" />
      )}
    </div>
  );
};
