"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useNavigationContext } from "@/contexts/navigation-context";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/utils/constant";

import {
  CircleUserRound,
  LogIn,
  LogOut,
  Menu,
  UsersRound,
  X,
} from "lucide-react";
import { Icons } from "./nav-icons";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import NotificationFeed from "@/components/notification/notification-feed";
import SeparatorLine from "@/components/common/separator-line";

export default function MobileMenu({ className }) {
  const { data } = useSession();
  const { isHomePage, scrolled, pathname } = useNavigationContext();
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className={className}>
      <NotificationFeed />

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={clsx(
              "focus:ring-0",
              isHomePage && !scrolled
                ? "text-white hover:text-white"
                : "text-black dark:text-white",
            )}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="dark:bg-ss-black-717 w-screen bg-white px-4 pb-6 text-black shadow-lg md:hidden dark:text-white">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="w-full">
                <Link
                  href={item.href}
                  className={clsx(
                    "my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm",
                    "transition-colors",
                    "focus:bg-gray-100 focus:outline-none dark:focus:bg-zinc-800",
                    isActive &&
                      "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
                  )}
                  onClick={handleClose}
                >
                  <Icons name={item.label} className="mr-2 size-5" />
                  <span>{item.label}</span>
                </Link>
              </div>
            );
          })}

          <SeparatorLine />

          {data ? (
            <UserNavSection handleClose={handleClose} />
          ) : (
            <GuestNavSection />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

function UserNavSection({ handleClose }) {
  const { pathname, handleSignOut } = useNavigationContext();

  return (
    <>
      <div className="w-full">
        <Link
          href="/my-network"
          className={clsx(
            "my-1 flex w-full items-center justify-start rounded-md px-4 py-2 text-sm",
            "transition-colors",
            pathname === "/my-network" &&
              "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
          )}
          onClick={handleClose}
        >
          <UsersRound className="mr-2 size-5" />
          <span>My Network</span>
        </Link>
      </div>

      <div className="w-full">
        <Link
          href="/my-profile"
          className={clsx(
            "my-1 flex w-full items-center justify-start rounded-md px-4 py-2 text-sm",
            "transition-color",
            pathname === "/my-profile" &&
              "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
          )}
          onClick={handleClose}
        >
          <CircleUserRound className="mr-2 size-5" /> <span>My Profile</span>
        </Link>
      </div>

      <SeparatorLine />

      <div className="w-full">
        <Button
          onClick={handleSignOut}
          className="text-ss-black-121 dark:text-ss-light-FFF my-1 flex w-full items-center justify-start rounded-md bg-transparent py-2 text-sm transition-colors"
        >
          <LogOut className="mr-0.5 ml-1.5 size-5" /> Sign Out
        </Button>
      </div>
    </>
  );
}

function GuestNavSection() {
  return (
    <div className="w-full">
      <Button
        asChild
        className="text-ss-black-121 dark:text-ss-light-FFF mt-1 flex w-full items-center justify-start rounded-md bg-transparent py-2 text-sm font-bold transition-colors"
      >
        <Link href="/signin">
          <LogIn className="mr-0.5 ml-1.5 size-5" />
          Sign In
        </Link>
      </Button>
    </div>
  );
}
