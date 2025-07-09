"use client";

const initialNotifications = [];

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import notificationService from "@/services/notification";
import { clientSocket } from "@/lib/socket";

import NotificationSlide from "@/components/notification/notification-slide";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { data, status } = useSession();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  useEffect(() => {
    const fetchNotificationData = async () => {
      const NOTIFS = await notificationService.getAllNotifications(data?.user);

      if (NOTIFS) {
        const sortedNotifs = NOTIFS.sort((notifA, notifB) => {
          const timeA = new Date(notifA.createdAt);
          const timeB = new Date(notifB.createdAt);

          return timeB - timeA;
        });
        setNotifications(sortedNotifs);
      }
    };

    if (data && status !== "loading") {
      fetchNotificationData(data.user);
    } else if (!data && status !== "loading") {
      setNotifications(initialNotifications);
    }
  }, [data]);

  useEffect(() => {
    const handleNewNotif = (notification) => {
      const { receiver } = notification;
      if (receiver.id !== data?.user) {
        return;
      }

      setNotifications(notifications.concat(notification));
      toast(
        <div className="-mx-3 w-[90vw] md:mr-5 md:max-w-sm lg:max-w-md">
          <NotificationSlide data={notification} isToast={true} />
        </div>,
      );
    };

    const handleCancel = async (filter) => {
      const { sender, receiver, type } = filter;
      if (receiver.id !== data?.user) {
        return;
      }

      setNotifications(
        notifications.filter(
          (notif) =>
            notif.sender === sender &&
            notif.receiver === receiver &&
            notif.type === type,
        ),
      );
    };

    clientSocket.on("createConnection", handleNewNotif);
    clientSocket.on("acceptConnection", handleNewNotif);
    clientSocket.on("cancelConnection", handleCancel);

    return () => {
      clientSocket.off("createConnection", handleNewNotif);
      clientSocket.off("acceptConnection", handleNewNotif);
      clientSocket.off("cancelConnection", handleCancel);
    };
  }, []);

  const getNotification = async (notificationId) => {
    const notification =
      await notificationService.getNotification(notificationId);

    return notification;
  };

  const createNotification = async (sender, receiver, type, isRead = false) => {
    const notification = { sender, receiver, type, isRead };

    return await notificationService.createNotification(notification);
  };

  const updateNotification = async (notificationId) => {
    await notificationService.updateNotification(notificationId);

    setNotifications(
      notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const updateAllNotifications = () => {
    notifications.map(
      async (notif) => await notificationService.updateNotification(notif.id),
    );

    setNotifications(
      notifications.map((notif) => {
        return { ...notif, isRead: true };
      }),
    );
  };

  const removeNotification = async (filter) => {
    const deletedNotification =
      await notificationService.removeNotification(filter);

    setNotifications(
      notifications.filter((notif) => notif.id !== deletedNotification.id),
    );
  };

  const removeNotificationById = async (notificationId) => {
    await notificationService.removeNotificationById(notificationId);

    setNotifications(
      notifications.filter((notif) => notif.id !== notificationId),
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        getNotification,
        createNotification,
        updateNotification,
        updateAllNotifications,
        removeNotification,
        removeNotificationById,
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
