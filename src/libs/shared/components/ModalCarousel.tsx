import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { SliderShowGroupImage } from "./SliderShowGroupImage";
interface ModalCarouselProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  imagesList: Array<string>;
}
export const ModalCarousel = ({
  open,
  setOpen,
  imagesList,
}: ModalCarouselProps) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/80 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-1000 overflow-y-auto w-full sm:w-[80%] lg:w-[60%] text-center mx-auto">
        <div className="flex min-h-full w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <SliderShowGroupImage imagesList={imagesList} />
            <div className="absolute top-0 right-3">
              <button
                className="text-3xl text-white transition duration-300 ease-in-out hover:scale-105"
                onClick={() => setOpen(false)}
              >
                <XCircleIcon className="text-white w-10 h-10" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
