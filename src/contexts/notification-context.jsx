"use client";

const initialNotifications = [];

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import notificationService from "@/services/notification";
import { clientSocket } from "@/lib/socket";

import { ConnectionsButtons } from "@/components/user-card/connection-buttons";

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
    const handleCreate = (notification, connection) => {
      const { sender, receiver } = notification;
      if (receiver.id !== data?.user) {
        return;
      }

      const { username } = sender;

      setNotifications(notifications.concat(notification));
      toast(`@${username} wants to connect with you.`, {
        action: (
          <ConnectionsButtons
            connection={connection}
            targetUsername={username}
          />
        ),
      });
    };

    const handleAccept = async (notification) => {
      const { sender, receiver } = notification;
      if (receiver.id !== data?.user) {
        return;
      }

      setNotifications(notifications.concat(notification));
      toast(`@${sender.username} accepted your connection request.`);
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

    clientSocket.on("createConnection", handleCreate);
    clientSocket.on("acceptConnection", handleAccept);
    clientSocket.on("cancelConnection", handleCancel);

    return () => {
      clientSocket.off("createConnection", handleCreate);
      clientSocket.off("acceptConnection", handleAccept);
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
