/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from "lodash";
import { stringify } from "qs";
import { useMemo } from "react";
export const numberWithCommas = (
  number = "",
  digits = 2,
  showZeroDecimal = false,
  showFullDigit = false,
) => {
  if (!number) return showZeroDecimal ? parseFloat("0").toFixed(digits) : "0";
  const textNumber = showFullDigit
    ? parseFloat(number).toString()
    : parseFloat(number).toFixed(digits);

  const parts = textNumber.split(".");
  if (!parts.length) return "0";
  if (parts.length === 2) {
    const decimal =
      parseInt(parts[1]) === 0 && !showZeroDecimal ? "" : `.${parts[1]}`;
    return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + decimal;
  }

  return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCurrency = (
  value = 0,
  currency = "",
  digits = 2,
  isRound = false,
  showZeroDecimal = false,
) => {
  const finalValue = isRound ? roundAmount(value) : value;
  return ` ${numberWithCommas(String(finalValue), digits, showZeroDecimal)} ${
    currency || ""
  }`;
};

export const roundAmount = (amount: number, step = 0.5) => {
  return Math.ceil(amount - step);
};

export function buildQueryString(params: any) {
  if (isEmpty(params)) {
    return "";
  }

  const query = stringify(params, { arrayFormat: "repeat" });
  return `?${query}`;
}

export function cleanEmptyFields(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    const isEmptyObject =
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0;
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    const isEmptyString = typeof value === "string" && value.trim() === "";

    if (!isEmptyObject && !isEmptyArray && !isEmptyString) {
      newObj[key] = value;
    }
  }

  return newObj;
}

export function useCapitalize(text?: string) {
  const capitalized = useMemo(() => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }, [text]);

  return capitalized;
}

export const getStatusClass = (status: string) => {
  switch (status) {
    case "PENDING":
    case "bookingInProgress":
    case "bookingCreated":
    case "IN_PROGRESS":
      return "bg-[#BFDBFE]/30 hover:bg-[#BFDBFE]/50 text-[#2563EB]";
    case "CONFIRMED":
    case "bookingConfirmed":
      return "bg-[#BBF7D0]/30 hover:bg-[#BBF7D0]/50 text-[#16a34a]";
    case "COMPLETED":
    case "bookingCompleted":
      return "bg-purple-300 hover:bg-purple-400 text-purple-800";
    case "CANCELLED_BY_ADMIN":
    case "CANCELLED_BY_USER":
    case "bookingCanceled":
      return "bg-primary/30 hover:bg-primary/50 text-primary";
    default:
      return "bg-[#FEF08A]/30 hover:bg-[#FEF08A]/50 text-[#CA8A04]";
  }
};

export const getLocale = () => {
  if (typeof window === "undefined") return "en";

  const path = window.location.pathname;
  const locale = path.split("/")[1];
  return locale || "en";
};
