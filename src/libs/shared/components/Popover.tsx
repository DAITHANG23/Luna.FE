import { JSX } from "react";

interface PopoverProps {
  iconButton: JSX.Element;
  content: JSX.Element;
}

export const Popover = ({ iconButton, content }: PopoverProps) => {
  return (
    <div className="group relative">
      {iconButton}

      <div className="invisible absolute top-[-16px] right-[24px] z-50 mt-2 w-[200px] translate-y-2 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-500 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 sm:w-[360px] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
        {content}
      </div>
    </div>
  );
};
