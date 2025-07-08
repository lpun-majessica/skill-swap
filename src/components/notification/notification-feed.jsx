"use client";

import { useNavigationContext } from "@/contexts/navigation-context";
import { useNotificationContext } from "@/contexts/notification-context";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import clsx from "clsx";

import NotificationPing from "./notification-ping";
import { Button } from "../ui/button";
import NotificationSlide from "./notification-slide";
import SeparatorLine from "../common/separator-line";

const EmptyNotification = () => {
  return <div className="my-2 w-full text-center">No notifications.</div>;
};

const NotificationFeed = () => {
  const { isHomePage, scrolled } = useNavigationContext();
  const { notifications, unreadCount, updateAllNotifications } =
    useNotificationContext();

  const iconColor =
    isHomePage && !scrolled
      ? "text-white hover:text-white"
      : "text-black dark:text-white";

  const handleReadAll = () => {
    updateAllNotifications();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={clsx(
            iconColor,
            !scrolled &&
              "hover:bg-ss-black-171/30 hover:dark:bg-ss-black-171/50",
            "relative",
          )}
        >
          <Bell className={`${iconColor} size-5`} />
          <NotificationPing />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="dark:bg-ss-black-121 mx-2 w-[96vw] max-w-md md:mr-5">
        <div className="-mt-1 flex flex-row items-center">
          <h3 className="ml-2 text-base font-bold lg:text-lg">Notifications</h3>

          <Button
            variant="link"
            disabled={unreadCount === 0}
            className="ml-auto text-sm lg:text-base"
            onClick={handleReadAll}
          >
            Mark all as read
          </Button>
        </div>

        {notifications.length === 0 ? (
          <EmptyNotification />
        ) : (
          notifications.map((notif) => (
            <div key={notif.id}>
              <SeparatorLine />
              <NotificationSlide data={notif} />
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationFeed;
