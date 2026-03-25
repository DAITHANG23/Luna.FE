"use client";
import { StatusHistory } from "@/@types/models/booking";
import { cn } from "@/utils";
import dayjs from "dayjs";
import React from "react";
import {
  ReceiptTextIcon,
  ClipboardCheckIcon,
  UtensilsIcon,
  StarIcon,
  BookXIcon,
} from "lucide-react";

interface StepperProps {
  statusHistory: Array<StatusHistory>;
  allSteps: Array<string>;
  labelMap: Record<string, string>;
}
export const Stepper = ({
  statusHistory,
  allSteps,
  labelMap,
}: StepperProps) => {
  const historyMap = Object.fromEntries(statusHistory.map(s => [s.status, s]));
  const currentIndex = statusHistory.length - 1;

  const StepperIcon = (step: string) => {
    switch (step) {
      case "PENDING":
        return <ReceiptTextIcon />;
      case "CONFIRMED":
        return <ClipboardCheckIcon />;
      case "IN_PROGRESS":
        return <UtensilsIcon />;
      case "CANCELLED_BY_USER":
      case "CANCELLED_BY_ADMIN":
        return <BookXIcon />;
      default:
        return <StarIcon />;
    }
  };
  return (
    <div className="mx-auto mt-8 flex w-full max-w-4xl items-start justify-between lg:px-4">
      {allSteps.map((step, index) => {
        const isDone = index < statusHistory.length;
        const isCurrent = index === currentIndex;
        const history = historyMap[step];
        const isCancelled =
          step === "CANCELLED_BY_USER" || step === "CANCELLED_BY_ADMIN";
        return (
          <div
            key={step}
            className="relative flex flex-1 flex-col items-center"
          >
            {index > 0 && (
              <div
                className={cn("absolute top-5 -left-1/2 h-1 w-full", {
                  "bg-green-500": index <= currentIndex,
                  "bg-gray-300": index > currentIndex,
                })}
              />
            )}

            <div
              className={cn(
                "z-5 mb-2 flex h-11 w-11 items-center justify-center rounded-full border-2 lg:h-11 lg:w-11",
                {
                  "border-green-500 bg-green-500 text-white":
                    step === "COMPLETED" || (isDone && !isCurrent),
                  "border-yellow-400 bg-yellow-400 text-white":
                    isCurrent && step !== "COMPLETED" && !isCancelled,
                  "border-gray-300 bg-gray-200 text-gray-500": !isDone,
                  "boder-red-500 bg-red-500 text-white": isCancelled,
                }
              )}
            >
              {StepperIcon(step)}
            </div>

            <div className="text-primary-text text-center text-sm font-medium">
              {labelMap[step]}
            </div>
            {history && (
              <div className="mt-1 text-center text-xs text-gray-500">
                {dayjs(history.updatedAt).format("DD/MM/YYYY HH:mm")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
