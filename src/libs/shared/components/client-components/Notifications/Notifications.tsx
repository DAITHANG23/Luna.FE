"use client";

import React from "react";
import { ABOUT_IMAGES } from "@/constants";
import { Slider } from "@shared/components/index";
import { NotificationMain } from "@shared/components/client-components/Notifications";

export const Notification = () => {
  return (
    <NotificationMain>
      <Slider isSmallSize coverImages={ABOUT_IMAGES} />
    </NotificationMain>
  );
};
