import { JSX } from "react";

interface PopoverProps {
  iconButton: JSX.Element;
  content: JSX.Element;
}

export const Popover = ({ iconButton, content }: PopoverProps) => {
  return (
    <div className="relative group">
      {iconButton}

      <div
        className="absolute right-[24px] top-[-16px] w-[200px] sm:w-[360px] mt-2 p-3 text-sm text-gray-500 bg-white border border-gray-200 
             rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600
             opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible 
             group-hover:translate-y-0 transition-all duration-300 z-50"
      >
        {content}
      </div>
    </div>
  );
};
