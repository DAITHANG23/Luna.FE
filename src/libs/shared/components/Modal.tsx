import { cn } from "@/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import React, { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
  classNameContainer?: string;
}

export const Modal = ({
  open,
  setOpen,
  children,
  classNameContainer,
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-100">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 2xl:pt-0 pt-[80px] w-screen overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={cn(
              classNameContainer,
              "relative transform overflow-hidden rounded-lg p-4 bg-white dark:bg-background text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[90%] lg:max-w-3xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            )}
          >
            {children}
            <div className="absolute top-2 right-3">
              <button
                className="text-3xl text-white transition duration-300 ease-in-out hover:scale-105"
                onClick={() => setOpen(false)}
              >
                <XCircleIcon className="text-gray-400 hover:text-gray-500 w-10 h-10" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
