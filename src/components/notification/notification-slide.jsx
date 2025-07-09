import { useConnectionContext } from "@/contexts/connection-context";
import { useNotificationContext } from "@/contexts/notification-context";

import UserAvatar from "../user-card/avatar";
import { ConnectionsButtons } from "../user-card/connection-buttons";
import NotificationOptions from "./notification-options";

const NotificationSlide = ({ data, isToast = false }) => {
  const { findConnectionWith } = useConnectionContext();
  const { updateNotification, removeNotificationById } =
    useNotificationContext();
  const { id, sender, type, isRead, createdAt } = data;
  const { id: senderId, username: senderUsername } = sender;

  const messageContent = {
    createConnection: "sent you a connection request.",
    acceptConnection: "accepted your connection request.",
  };

  const connection = findConnectionWith(sender.id);
  const displayTime = calculateTime(createdAt);
  const message = messageContent[type];

  const handleRead = async () => {
    if (!isRead) {
      await updateNotification(id);
    }
  };

  const handleDelete = async () => await removeNotificationById(id);

  return (
    <div
      className="mx-2 flex h-fit min-h-18 items-center justify-between gap-4 md:my-2"
      onClick={handleRead}
    >
      {!isToast && (
        <div className="-mr-0.5 -ml-2 w-3">
          {!isRead && <div className="bg-ss-red-505 size-2 rounded-full" />}
        </div>
      )}

      <UserAvatar
        className="mx-auto aspect-square size-17 md:size-15"
        pfp={sender.pfp}
      />

      <div className="-mr-2 ml-1 w-[75%] space-y-3">
        <div className="text-sm lg:text-base">
          <p>
            <span className="font-bold">@{senderUsername}</span>
            <span className="text-ss-black-444 dark:text-ss-black-171 ml-4 text-xs font-medium italic lg:text-sm">
              {displayTime}
            </span>
          </p>
          <p>{message}</p>
        </div>

        {type === "createConnection" && (
          <div className="flex flex-row flex-wrap gap-2">
            <ConnectionsButtons
              connection={connection}
              targetUserId={senderId}
              targetUsername={senderUsername}
              notificationId={id}
            />
          </div>
        )}
      </div>

      <NotificationOptions
        handleRead={handleRead}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default NotificationSlide;

function calculateTime(createdAt) {
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const time = Date.now() - new Date(createdAt);

  let number;
  let unit;

  if (time >= day) {
    unit = "d";
    number = Math.floor(time / day);
  } else if (time >= hour) {
    unit = "h";
    number = Math.floor(time / hour);
  } else if (time >= minute) {
    unit = "m";
    number = Math.floor(time / minute);
  } else {
    return "Just now";
  }

  return `${number}${unit} ago`;
}
