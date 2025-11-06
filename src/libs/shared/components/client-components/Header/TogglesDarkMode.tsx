"use client";
import { MoonIcon } from "@/libs/assets";
import { SunIcon } from "@/libs/assets";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslations } from "next-intl";
interface SliderToggle {
  selected?: "light" | "dark";
  setSelected: (value: "light" | "dark") => void;
}

const TOGGLE_CLASSES =
  "text-sm dark:text-white font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const TogglesDarkMode = () => {
  const { theme, setTheme } = useAppContext();
  return (
    <div className="flex justify-center">
      <SliderToggle selected={theme} setSelected={setTheme} />
    </div>
  );
};

const SliderToggle = ({ selected, setSelected }: SliderToggle) => {
  const t = useTranslations("Translation");
  return (
    <div className="relative flex w-fit items-center rounded-full not-prose">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("light");
        }}
      >
        <MoonIcon />
        <p className="relative z-10 ">{t("settings.light")}</p>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark");
        }}
      >
        <SunIcon />
        <p className="relative z-10">{t("settings.dark")}</p>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-linear-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default TogglesDarkMode;
