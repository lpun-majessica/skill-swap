"use client";

import { useRouter } from "next/navigation";
import { useConnectionContext } from "@/contexts/connection-context";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useNotificationContext } from "@/contexts/notification-context";

import { clientSocket } from "@/lib/socket";
import { toast } from "sonner";

import { Button, PopUpButton } from "@/components/common/buttons";
import { UserRoundPlus } from "lucide-react";

export function ConnectionsButtons({ targetUserId, targetUsername }) {
  const router = useRouter();
  const { currentUser } = useCurrentUserContext();
  const {
    createConnection,
    updateConnection,
    removeConnection,
    findConnectionWith,
  } = useConnectionContext();
  const { createNotification, removeNotification } = useNotificationContext();

  const connection = findConnectionWith(targetUserId);
  const socketTargets = { sender: currentUser.id, receiver: targetUserId };

  const handleNotSignIn = () => router.push("/signin");

  const notifyUser = async (type) => {
    const { sender, receiver } = socketTargets;

    const newNotification = await createNotification(sender, receiver, type);
    return newNotification;
  };

  const undoNotification = async (filter) => await removeNotification(filter);

  const handleCreate = async () => {
    const type = "createConnection";
    const connection = await createConnection(currentUser.id, targetUserId);

    const notification = await notifyUser(type);
    clientSocket.emit("connectionRequest", type, notification, connection);
    toast.success(
      <span>
        Sent connection request to <strong>@{targetUsername}</strong>!
      </span>,
    );
  };

  const handleAccept = async () => {
    const type = "acceptConnection";
    await updateConnection(connection.id);

    const notification = await notifyUser(type);
    clientSocket.emit("connectionRequest", type, notification, connection);
    toast.success(
      <span>
        Accepted request from <strong>@{targetUsername}</strong> successfully!
      </span>,
    );

    const { sender, receiver } = notification;
    const deleteFilter = {
      sender: receiver.id,
      receiver: sender.id,
      type: "createConnection",
    };
    await undoNotification(deleteFilter);
  };

  const handleCancel = async () => {
    const type = "cancelConnection";
    const notifFilter = {
      ...socketTargets,
      type: "createConnection",
    };
    await undoNotification(notifFilter);

    clientSocket.emit("connectionRequest", type, notifFilter, connection);
    removeConnection(connection.id);
  };

  const handleDecline = async () => {
    const type = "declineConnection";
    const notifFilter = {
      sender: socketTargets.receiver,
      receiver: socketTargets.sender,
      type: "createConnection",
    };
    await undoNotification(notifFilter);

    clientSocket.emit("connectionRequest", type, socketTargets, connection);
    toast.message(
      <span>
        Declined request from <strong>@{targetUsername}</strong>
      </span>,
    );

    removeConnection(connection.id);
  };

  const handleRemove = async () => {
    const type = "removeConnection";
    const notifFilter = {
      sender: { $in: [socketTargets.sender, socketTargets.receiver] },
      receiver: { $in: [socketTargets.sender, socketTargets.receiver] },
      type: "acceptConnection",
    };
    await undoNotification(notifFilter);

    clientSocket.emit("connectionRequest", type, socketTargets, connection);
    removeConnection(connection.id);
  };

  if (currentUser.id === 0) {
    return (
      <Button text="Connect" variant="red" onClick={handleNotSignIn}>
        <UserRoundPlus />
      </Button>
    );
  }

  if (!connection) {
    return (
      <Button text="Connect" variant="red" onClick={handleCreate}>
        <UserRoundPlus />
      </Button>
    );
  }

  if (connection.isAccepted) {
    return (
      <PopUpButton
        variant="connected"
        username={targetUsername}
        onClick={handleRemove}
      />
    );
  } else if (connection.sender_id === currentUser.id) {
    return (
      <PopUpButton
        variant="pending"
        username={targetUsername}
        onClick={handleCancel}
      />
    );
  } else if (connection.receiver_id === currentUser.id) {
    return (
      <>
        <Button text="Decline" variant="gray" onClick={handleDecline} />
        <Button text="Accept" variant="red" onClick={handleAccept} />
      </>
    );
  }
}
