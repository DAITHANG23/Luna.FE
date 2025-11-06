"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { JSX } from "react";
import { TypeOfTabs } from "./client-components/Profile";

interface TablistProps {
  tabList: Array<{ name: TypeOfTabs; icon: JSX.Element }>;
  activeTab: string;
  setActiveTab: (tabName: TypeOfTabs) => void;
}

export const Tabs = ({ tabList, setActiveTab, activeTab }: TablistProps) => {
  const t = useTranslations("Profile");

  return (
    <div className="border-gray-200 dark:border-gray-700 not-prose">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabList?.map((tab) => {
          return (
            <li
              key={tab.name}
              className="me-6"
              onClick={() => setActiveTab(tab.name)}
            >
              <p
                className={clsx(
                  "text-base inline-flex items-center justify-center pb-2 border-b-2 border-transparent rounded-t-lg hover:text-primary hover:border-primary group cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  activeTab === tab.name
                    ? "text-primary border-primary text-primary border-primary"
                    : ""
                )}
              >
                {tab.icon}{" "}
                <span className="ml-1">{t("tabs", { tabs: tab.name })}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
