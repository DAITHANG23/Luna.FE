"use client";
import { timeSlotOptions } from "@/constants";
import { Clock, Users } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useFormikContext } from "formik";
import { RestaurantBooking } from "@/@types/models";
import { cn } from "@/utils";
import { FieldInput, SelectField } from "@/libs/shared/components";
import { useTranslations } from "next-intl";

const NOTES_LIST = [
  { label: "Có trẻ em", value: "Có trẻ em" },
  { label: "Tiệc sinh nhật", value: "Tiệc sinh nhật" },
  { label: "Cần ghế trẻ em", value: "Cần ghế trẻ em" },
  { label: "Bàn gần cửa sổ", value: "Bàn gần cửa sổ" },
];

interface FormDetailProps {
  handleTimeSlotChange: (value: string) => void;
  handlePeopleQuantityChange: (value: string) => void;
  onClickNotes: (value: string) => void;
  handleChangeText: (value: string) => void;
  chooseTimeSlot: string;
  choosePeopleQuantity: string;
  chooseNotes: Array<string>;
  notesContent: string;
}
export const FormDetail = ({
  handlePeopleQuantityChange,
  handleTimeSlotChange,
  handleChangeText,
  onClickNotes,
  chooseTimeSlot,
  choosePeopleQuantity,
  notesContent,
  chooseNotes,
}: FormDetailProps) => {
  const t = useTranslations("Restaurant");
  const formik = useFormikContext<RestaurantBooking>();

  useEffect(() => {
    if (!formik?.setFieldValue) return;

    if (formik.values.timeSlot !== chooseTimeSlot) {
      formik.setFieldValue("timeSlot", chooseTimeSlot);
    }
    if (formik.values.peopleQuantity !== choosePeopleQuantity) {
      formik.setFieldValue("peopleQuantity", choosePeopleQuantity);
    }
    if (formik.values.notes !== notesContent) {
      formik.setFieldValue("notes", notesContent);
    }
  }, [chooseTimeSlot, choosePeopleQuantity, notesContent, formik]);

  const peopleQuantityOptions = useMemo(() => {
    return Array.from({ length: 49 }, (_, i) => ({
      label: `${i + 2} người`,
      value: `${(i + 2).toString()}`,
    }));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <FieldInput
          title={t("label.date")}
          name="timeOfBooking"
          required
          type="date"
          isBookingDate
          classNameInput="w-full px-3! py-[6px]!"
        />

        <SelectField
          key={"timeSlot"}
          value={chooseTimeSlot}
          options={timeSlotOptions}
          onChange={handleTimeSlotChange}
          classNameContainer="w-full!"
          label={t("label.time")}
          classNameButton="w-full px-3! py-[6px]!"
          required
          startIcon={<Clock className="text-primary-text w-4 h-4" />}
        />

        <SelectField
          key={"peopleQuantity"}
          value={choosePeopleQuantity}
          options={peopleQuantityOptions}
          onChange={handlePeopleQuantityChange}
          label={t("label.peopleQuantity")}
          classNameContainer="w-full!"
          required
          classNameButton="w-full px-3! py-[6px]!"
          startIcon={<Users className="text-primary-text w-4 h-4" />}
        />

        <FieldInput
          title={t("label.fullName")}
          name="fullName"
          required
          type="text"
          classNameInput="w-full px-3! py-[6px]!"
        />

        <FieldInput
          title={t("label.numberPhone")}
          name="numberPhone"
          required
          type="text"
          classNameInput="w-full px-3! py-[6px]!"
        />

        <FieldInput
          title={"Email"}
          name="email"
          required
          type="text"
          classNameInput="w-full px-3! py-[6px]!"
        />
      </div>

      <div>
        <p className="font-medium text-sm text-primary-text">
          {t("label.notes")}
        </p>
        <textarea
          id="message"
          name="notes"
          onChange={({ currentTarget }) =>
            handleChangeText(currentTarget.value)
          }
          value={notesContent ?? ""}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t("concepts.placeholder.notes")}
        />
        <div className="flex flex-wrap gap-3 mt-2">
          {NOTES_LIST.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => onClickNotes(item.value)}
              className={cn(
                chooseNotes.includes(item.value) &&
                  "border-none! !bg-primary text-white!",
                "border border-gray-500 rounded-full px-4 py-1 bg-gray-200 text-sm hover:scale-105",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
