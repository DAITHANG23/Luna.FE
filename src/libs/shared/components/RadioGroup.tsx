"use client";
import { Gender } from "@/@types/models";
import { Field } from "formik";
import { useTranslations } from "next-intl";

interface RadioGroupProps {
  title: string;
  itemList: Array<{ id: string; name: string; value: Gender; title: string }>;
}
export const RadioGroup = ({ title, itemList }: RadioGroupProps) => {
  const t = useTranslations("Profile");

  return (
    <div>
      <label className="text-primary-text text-sm font-medium">
        {title} <span className="text-error ml-1">*</span>
      </label>
      <div className="mt-5 flex justify-center gap-4 sm:gap-10">
        {itemList.map(item => {
          return (
            <div key={item.id} className="flex items-center">
              <Field
                id={item.id}
                type="radio"
                name={item.name}
                value={item.value}
                className="!text-primary h-4 w-4 border-gray-300 bg-gray-100"
              />
              <label
                htmlFor={item.id}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {t("profile.typeOfGender", { gender: item.value })}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
