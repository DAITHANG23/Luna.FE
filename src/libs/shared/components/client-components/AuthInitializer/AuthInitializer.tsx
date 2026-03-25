"use client";
import socket from "@/features/notification/socket";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { unReadNotifications } from "@/libs/redux/masterData/masterDataSlice";
import { unReadNotificationsLength } from "@/libs/redux/masterData/selectors";
import { useEffect } from "react";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  const allNotificationsUnReadLength = useAppSelector(
    unReadNotificationsLength
  );

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
        unReadNotificationsQuantity: allNotificationsUnReadLength,
      })
    );
  }, [dispatch, allNotificationsUnReadLength]);

  return null;
};

export default AuthInitializer;
