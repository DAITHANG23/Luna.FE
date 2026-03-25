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
      return options.find(o => o.value === value)?.label;
    }
    return "";
  }, [value, options]);

  return (
    <div className={cn(classNameContainer, "relative w-full lg:w-63")}>
      <Listbox value={value} onChange={onChange}>
        {label && (
          <Label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </Label>
        )}

        <ListboxButton
          className={cn(
            classNameButton,
            "relative flex grid w-full cursor-default cursor-pointer grid-cols-1 items-center rounded-md border border-gray-300 bg-gray-50 bg-white p-2 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          )}
        >
          {startIcon && (
            <div className="pointer-events-none absolute left-3 text-gray-400">
              {startIcon}
            </div>
          )}
          <span
            className={cn(
              startIcon && "pl-8",
              "col-start-1 row-start-1 flex h-[20px] items-center gap-3 pr-6"
            )}
          >
            <span className="text-primary-text block text-base font-normal">
              {labelSelected || placeholder}
            </span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 h-4 w-4 self-center justify-self-end text-stone-600 dark:text-stone-200"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-700"
        >
          {options &&
            options?.map(o => (
              <ListboxOption
                key={o.label}
                value={o.value}
                className="group hover:bg-primary aria-selected:bg-primary relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none hover:text-white aria-selected:text-white aria-selected:outline-hidden"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate group-aria-selected:font-semibold dark:text-white">
                    {o.label}
                  </span>
                </div>
                {value === o.value && (
                  <span className="text-primary absolute inset-y-0 right-0 flex items-center pr-4 group-aria-selected:text-white group-[aria-selected=false]:hidden">
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
