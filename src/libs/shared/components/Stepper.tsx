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
  const historyMap = Object.fromEntries(
    statusHistory.map((s) => [s.status, s])
  );
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
    <div className="flex items-start justify-between w-full max-w-4xl mx-auto mt-8 lg:px-4">
      {allSteps.map((step, index) => {
        const isDone = index < statusHistory.length;
        const isCurrent = index === currentIndex;
        const history = historyMap[step];
        const isCancelled =
          step === "CANCELLED_BY_USER" || step === "CANCELLED_BY_ADMIN";
        return (
          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >
            {index > 0 && (
              <div
                className={cn("absolute -left-1/2 top-5 h-1 w-full", {
                  "bg-green-500": index <= currentIndex,
                  "bg-gray-300": index > currentIndex,
                })}
              />
            )}

            <div
              className={cn(
                "w-11 h-11 lg:w-11 lg:h-11 rounded-full flex items-center justify-center border-2 mb-2 z-5",
                {
                  "bg-green-500 text-white border-green-500":
                    step === "COMPLETED" || (isDone && !isCurrent),
                  "bg-yellow-400 text-white border-yellow-400":
                    isCurrent && step !== "COMPLETED" && !isCancelled,
                  "bg-gray-200 text-gray-500 border-gray-300": !isDone,
                  "bg-red-500 text-white boder-red-500": isCancelled,
                }
              )}
            >
              {StepperIcon(step)}
            </div>

            <div className="text-center text-sm font-medium text-primary-text">
              {labelMap[step]}
            </div>
            {history && (
              <div className="text-xs text-gray-500 mt-1 text-center">
                {dayjs(history.updatedAt).format("DD/MM/YYYY HH:mm")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
