import React, { JSX } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { t } from "i18next";

interface ModalNotificationProps {
  title: string;
  content: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  icon: JSX.Element;
  labelButton: string;
  type?: "delete" | "update" | "warning";
  action: JSX.Element;
}
export const ModalNotification = ({
  title,
  content,
  open,
  setOpen,
  icon,
  type,
  action,
  labelButton,
}: ModalNotificationProps) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white dark:bg-[#1C252E] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={clsx(
                    type === "update"
                      ? "bg-green-100"
                      : type === "delete"
                        ? "bg-red-100"
                        : "bg-yellow-100",
                    "mx-auto flex size-12 shrink-0 items-center justify-center rounded-full  sm:mx-0 sm:size-10"
                  )}
                >
                  {icon}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900 dark:text-white"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-[#1C252E]/95 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {action}
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {t(`${labelButton}`)}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
