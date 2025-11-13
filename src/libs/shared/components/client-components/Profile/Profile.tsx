"use client";
import { SecurityIcon, GeneralProfile } from "@/libs/assets";
import React, { JSX, useEffect, useMemo, useState } from "react";
import useGetDataUser from "@/features/hooks/AccountHooks/useGetDataUser";
import { Tabs } from "@/libs/shared/components";
import { ProfileDetail } from "./ProfileDetail";
import { Security } from "./Security";
import { useRouter } from "@/libs/i18n/navigation";
import { useTranslations } from "next-intl";
export type TypeOfTabs = "tabProfile" | "tabSecurity";
const tabList: Array<{ name: TypeOfTabs; icon: JSX.Element }> = [
  { name: "tabProfile", icon: <GeneralProfile /> },
  { name: "tabSecurity", icon: <SecurityIcon /> },
];

export const Profile = () => {
  const router = useRouter();

  const { userData, isLoading } = useGetDataUser();
  const [activeTab, setActiveTab] = useState<TypeOfTabs>(tabList[0].name);
  const t = useTranslations("Profile");

  const updateTablist = useMemo(() => {
    if (userData?.data.data.googleId) {
      return tabList.filter((i) => i.name !== "tabSecurity");
    }
    return tabList;
  }, [userData]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("sessionId");

    if (!token && !userData?.data.data.avatarUrl) {
      router.push("/unauthorized");
    }
  }, [router, userData]);

  return (
    <div className="xl:w-[70%] w-[85%] flex flex-col justify-start mx-auto mb-20 mt-20 sm:mt-30">
      <h1 className="text-primary-text">{t("title")}</h1>
      <Tabs
        tabList={updateTablist}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="mt-10">
        {activeTab === "tabProfile" ? (
          <ProfileDetail userData={userData} isLoading={isLoading} />
        ) : (
          <Security />
        )}
      </div>
    </div>
  );
};
