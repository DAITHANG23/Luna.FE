"use client";
import clsx from "clsx";
import { useField } from "formik";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
interface FromTextFieldProps {
  title?: string;
  className?: string;
  name: string;
  type?: string;
  required?: boolean;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isPasswordFied?: boolean;
  isReadOnly?: boolean;
  classNameInput?: string;
  isBookingDate?: boolean;
  startIcon?: React.ReactNode;
}

export const FieldInput = ({
  title,
  className,
  name,
  type = "text",
  required = false,
  isPasswordFied = false,
  isReadOnly = false,
  isBookingDate = false,
  classNameInput,
  startIcon,
  ...props
}: FromTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);
  const today = format(new Date(), "yyyy-MM-dd");
  const isError = meta.touched && !!meta.error;
  const errorMessage = meta.error;

  return (
    <div className={clsx("mb-4 relative", className)}>
      <label
        className={clsx(
          isError ? "text-error" : "text-primary-text",
          "text-sm font-medium",
        )}
        htmlFor={name}
      >
        {title}
        {required && <span className="ml-1 text-error">*</span>}
      </label>

      <div className="relative flex items-center">
        {startIcon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            {startIcon}
          </div>
        )}
        <input
          id={name}
          className={clsx(
            "block w-full rounded-md py-[16.5px] px-[14px] bg-white text-sm dark:bg-[#1C252E] dark:border text-primary-text",
            isReadOnly
              ? "border-transparent dark:border-gray-500 p-2 rounded-md bg-gray-100 text-gray-500 read-only:bg-gray-200 read-only:cursor-not-allowed"
              : "border border-gray-300 dark:border-gray-300",
            isError
              ? "border border-red-500 dark:border-red-500"
              : "border border-gray-300 dark:border-gray-500",
            classNameInput,
            "focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25 dark:data-focus:outline-white/25",
          )}
          type={
            !isPasswordFied
              ? type
              : isPasswordFied && showPassword
                ? "text"
                : "password"
          }
          min={isBookingDate ? today : ""}
          readOnly={isReadOnly}
          {...field}
          {...props}
        />
        {isPasswordFied && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute min-w-0 right-3 top-[15px] cursor-pointer w-6 h-6 text-secondary-text hover:text-primary"
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {isError && <h5 className="text-error my-2">{errorMessage}</h5>}
    </div>
  );
};
