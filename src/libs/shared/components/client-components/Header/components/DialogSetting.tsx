"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "@/contexts/AppContext";
import TogglesDarkMode from "../TogglesDarkMode";
import { useTranslations } from "next-intl";

const DialogSetting = () => {
  const { isOpenDialog, setIsOpenDialog } = useAppContext();

  const [open, setOpen] = useState(false);

    const t = useTranslations("Translation");

  useEffect(() => {
    setOpen(isOpenDialog);
  }, [isOpenDialog]);

  return (
    <Dialog
      open={open}
      onClose={setIsOpenDialog}
      className="relative"
      style={{ zIndex: 1000 }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setIsOpenDialog(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full dark:bg-gray-800 flex-col overflow-y-scroll bg-white py-6 shadow-xl font-[inter] ">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold text-primary-text">
                    <p className="text-[25px]">{t("settings.title")}</p>
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <p className="text-bold font-bold mb-4 text-primary-text">
                    {t("settings.themeMode")}
                  </p>
                  <TogglesDarkMode />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
export default DialogSetting;
