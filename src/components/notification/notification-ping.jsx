"use client";

import { useEffect } from "react";
import { useNotificationContext } from "@/contexts/notification-context";

import { clientSocket } from "@/lib/socket";
import { toast } from "sonner";

import { ConnectionsButtons } from "../user-card/connection-buttons";

const NotificationPing = () => {
  const { notifications, createNotification } = useNotificationContext();
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const notifyUser = async (senderId) => {
    const newNotification = await createNotification(senderId);
    return newNotification;
  };

  useEffect(() => {
    clientSocket.on("createConnection", (connection) => {
      const { sender } = notifyUser(connection.sender_id);
      const { username } = sender;

      toast(`@${username} wants to connect with you.`, {
        action: (
          <ConnectionsButtons
            connection={connection}
            targetUsername={username}
          />
        ),
      });
    });

    clientSocket.on("acceptConnection", (connection) => {
      const { sender } = notifyUser(connection.sender_id);
      toast(`@${sender.username} accepted your connection request.`);
    });
  }, [clientSocket]);

  if (unreadCount === 0) {
    return;
  }

  return (
    <div className="text-ss-light-555 bg-ss-red-505 absolute top-1.5 right-2 size-2 rounded-full px-1 text-center text-xs" />
  );
};

export default NotificationPing;
