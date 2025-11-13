"use client";
import useResendOtp from "@/features/hooks/AccountHooks/useResendOtp";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export const ResendButton = () => {
  const resendOtp =
    typeof window !== "undefined" && localStorage.getItem("resendOtp");

  const t = useTranslations("Translation");

  const [timeLeft, setTimeLeft] = useState(resendOtp === "true" ? 90 : 0);

  const { mutate: resendOtpCode } = useResendOtp();

  const emailResetPassword =
    (typeof window !== "undefined" &&
      localStorage.getItem("emailResetPassword")) ||
    "";

  useEffect(() => {
    if (timeLeft === 0 && typeof window !== "undefined") {
      localStorage.setItem("resendOtp", "false");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResend = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resendOtp", "true");
    }
    const formData = { email: emailResetPassword };

    resendOtpCode(formData);
    setTimeLeft(90);
  };

  return (
    <div>
      <span className="mr-2 text-secondary-text">
        {t("resetPassword.dontHaveACode")}
      </span>
      <button
        onClick={timeLeft === 0 ? handleResend : undefined}
        disabled={timeLeft !== 0}
        className={clsx(
          timeLeft === 0
            ? "cursor-pointer opacity-100 hover:underline"
            : "cursor-not-allowed opacity-600",
          "text-primary text-base"
        )}
      >
        {timeLeft === 0
          ? t("resetPassword.resend")
          : `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`}
      </button>
    </div>
  );
};
