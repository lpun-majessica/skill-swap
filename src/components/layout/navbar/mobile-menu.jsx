"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useNavigationContext } from "@/contexts/navigation-context";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/utils/constant";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import NotificationFeed from "@/components/notification/notification-feed";

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
            "my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm",
            "transition-colors",
            pathname === "/my-network" &&
              "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
          )}
          onClick={handleClose}
        >
          <span>My Network</span>
        </Link>
      </div>

      <div className="w-full">
        <Link
          href="/my-profile"
          className={clsx(
            "my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm",
            "transition-color",
            pathname === "/my-profile" &&
              "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
          )}
          onClick={handleClose}
        >
          <span>My Profile</span>
        </Link>
      </div>

      <SeparatorLine />

      <div className="w-full">
        <Button
          onClick={handleSignOut}
          className="text-ss-black-121 dark:text-ss-light-FFF my-1 flex w-full justify-start rounded-md bg-transparent px-4 py-2 text-sm transition-colors"
        >
          Sign Out
        </Button>
      </div>
    </>
  );
}

function GuestNavSection() {
  const { handleSignIn } = useNavigationContext();

  return (
    <div className="mt-2 flex w-full justify-center px-4">
      <Button
        onClick={handleSignIn}
        className="bg-ss-red-505 mt-2 inline-block h-auto rounded-full border-0 px-6 py-2 text-white transition hover:bg-red-700"
      >
        Sign In
      </Button>
    </div>
  );
}

function SeparatorLine() {
  return <div className="my-2 h-px w-full bg-gray-200 dark:bg-zinc-800" />;
}
