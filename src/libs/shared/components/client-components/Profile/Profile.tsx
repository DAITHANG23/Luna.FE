"use client";
import { SecurityIcon, GeneralProfile } from "@/libs/assets";
import React, { JSX, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/libs/redux/hooks";
import { RootState } from "@/libs/redux/store";
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
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (!token && !isAuth && !userData?.data.data.avatarUrl) {
      router.push("/unauthorized");
    }
  }, [isAuth, router, userData]);

  return (
    <div className="xl:w-[70%] w-[85%] flex flex-col justify-start mx-auto mb-[5rem] mt-[5rem] sm:mt-[7.5rem]">
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
