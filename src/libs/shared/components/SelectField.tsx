"use client";
import { IOptions } from "@/@types/models";
import { cn } from "@/utils";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

interface SelectFieldProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  options: Array<IOptions>;
  placeholder?: string;
  classNameContainer?: string;
  classNameButton?: string;
  required?: boolean;
  startIcon?: React.ReactNode;
}

export const SelectField = ({
  label,
  onChange,
  value,
  options,
  placeholder,
  classNameContainer,
  classNameButton,
  required,
  startIcon,
}: SelectFieldProps) => {
  const labelSelected = useMemo(() => {
    if (value) {
      return options.find((o) => o.value === value)?.label;
    }
    return "";
  }, [value, options]);

  return (
    <div className={cn(classNameContainer, "relative w-full lg:w-63")}>
      <Listbox value={value} onChange={onChange}>
        {label && (
          <Label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
            {label}
            {required && <span className="ml-1 text-error">*</span>}
          </Label>
        )}

        <ListboxButton
          className={cn(
            classNameButton,
            "relative flex items-center border border-gray-300 rounded-md bg-gray-50 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white grid w-full cursor-default grid-cols-1 rounded-md bg-white p-2 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
          )}
        >
          {startIcon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none">
              {startIcon}
            </div>
          )}
          <span
            className={cn(
              startIcon && "pl-8",
              "col-start-1 row-start-1 flex items-center gap-3 pr-6 h-[20px]",
            )}
          >
            <span className="block text-primary-text font-normal text-base">
              {labelSelected || placeholder}
            </span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-stone-600 dark:text-stone-200 w-4 h-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options &&
            options?.map((o) => (
              <ListboxOption
                key={o.label}
                value={o.value}
                className="group relative cursor-pointer py-2 pr-9 pl-3 select-none
            hover:bg-primary hover:text-white
            text-gray-900 aria-selected:bg-primary aria-selected:text-white aria-selected:outline-hidden"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate dark:text-white group-aria-selected:font-semibold">
                    {o.label}
                  </span>
                </div>
                {value === o.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-[aria-selected=false]:hidden group-aria-selected:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                )}
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
