"use client";
import socket from "@/features/notification/socket";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getAllConcepts,
  getAllRestaurants,
  unReadNotifications,
} from "@/libs/redux/masterDataSlice";
import { useEffect, useMemo } from "react";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications,
  );

  const allNotificationsUnRead = useMemo(() => {
    return (
      allNotifications?.data.data.filter((item) => item.read === false) || []
    );
  }, [allNotifications]);

  useEffect(() => {
    const handleConnect = () => {
      const socketId = socket.id;
      if (socketId) {
        localStorage.setItem("socketId", socketId);
      }
    };

    const handleDisconnect = () => {
      localStorage.removeItem("socketId");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      unReadNotifications({
        unReadNotificationsQuantity: allNotificationsUnRead.length,
      }),
    );
  }, [dispatch, allNotificationsUnRead]);

  useEffect(() => {
    dispatch(getAllConcepts());
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
