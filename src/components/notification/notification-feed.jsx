"use client";

import { useNavigationContext } from "@/contexts/navigation-context";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import clsx from "clsx";

import NotificationPing from "./notification-ping";
import { Button } from "../ui/button";

const NotificationFeed = () => {
  const { isHomePage, scrolled } = useNavigationContext();

  const iconColor =
    isHomePage && !scrolled
      ? "text-white hover:text-white"
      : "text-black dark:text-white";

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

      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default NotificationFeed;
