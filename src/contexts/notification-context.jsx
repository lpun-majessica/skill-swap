"use client";

const initialNotifications = [];

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

import notificationService from "@/services/notification";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { data, status } = useSession();
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    const fetchNotificationData = async () => {
      const NOTIFS = await notificationService.getAllNotifications(data?.user);

      if (NOTIFS) {
        setNotifications(NOTIFS);
      }
    };

    if (data && status !== "loading") {
      fetchNotificationData(data.user);
    } else if (!data && status !== "loading") {
      setNotifications(initialNotifications);
    }
  }, [data]);

  const getNotification = async (notificationId) => {
    const notification =
      await notificationService.getNotification(notificationId);

    return notification;
  };

  const createNotification = async (sender_id, isRead = false) => {
    const type = "createNotification";
    const notification = { sender_id, receiver_id: data.user, type, isRead };
    const newNotification =
      await notificationService.createNotification(notification);

    setNotifications(notifications.concat(newNotification));

    return newNotification;
  };

  const updateNotification = async (notificationId) => {
    const updatedNotification =
      await notificationService.updateNotification(notificationId);

    setNotifications(
      notifications.map((notif) =>
        notif.id === updatedNotification.id ? updatedNotification : notif,
      ),
    );
  };

  const removeNotification = async (notificationId) => {
    await notificationService.removeNotification({
      notificationId,
    });

    setNotifications(
      notifications.filter((notif) => notif.id !== notificationId),
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getNotification,
        createNotification,
        updateNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within an NotificationProvider",
    );
  }
  return context;
}
