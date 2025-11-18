"use client";

import React from "react";
import { ABOUT_IMAGES } from "@/constants";
import { Slider } from "@shared/components/index";
import {
  NotificationDetail,
  NotificationMain,
} from "@shared/components/client-components/Notifications";
import { useSearchParams } from "next/navigation";

export const Notification = () => {
  const searchParams = useSearchParams();
  const notiSelected = searchParams.get("noti_selected");
  return (
    <>
      {!notiSelected ? (
        <NotificationMain>
          <Slider isSmallSize coverImages={ABOUT_IMAGES} />
        </NotificationMain>
      ) : (
        <NotificationDetail id={notiSelected || ""} />
      )}
    </>
  );
};
