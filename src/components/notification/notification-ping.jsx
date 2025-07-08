"use client";

import { useNotificationContext } from "@/contexts/notification-context";
const NotificationPing = () => {
  const { unreadCount } = useNotificationContext();

  if (unreadCount === 0) {
    return;
  }

  const displayCount = unreadCount >= 10 ? "9+" : unreadCount;

  return (
    <div className="text-ss-light-555 bg-ss-red-505 absolute top-0 right-0.5 size-4 min-w-fit rounded-full px-1 text-center text-xs">
      {displayCount}
    </div>
  );
};

export default NotificationPing;
