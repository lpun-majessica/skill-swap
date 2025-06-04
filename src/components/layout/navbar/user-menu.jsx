"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-card/avatar";
import { useAuthContext } from "@/contexts/auth-context";
import { useCurrentUserContext } from "@/contexts/current-user-context";

export default function UserMenu({
  handleLogin,
  handleLogout,
  isHomePage,
  scrolled,
}) {
  const { currentUser } = useAuthContext();
  const { username, fullname, pfp } = useCurrentUserContext().currentUser;

  if (!currentUser) {
    return (
      <Button
        onClick={handleLogin}
        className="bg-ss-red-505 inline-block h-auto rounded-full border-0 px-6 py-2 text-white transition hover:bg-red-700"
      >
        Log in
      </Button>
    );
  }

  return (
    <>
      <Button
        asChild
        className="bg-ss-red-505 rounded-full px-4 text-white transition hover:bg-red-700"
      >
        <Link href="/my-network">My Network</Link>
      </Button>

      {/* Profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 overflow-hidden rounded-full hover:cursor-pointer focus:outline-none">
            {pfp ? (
              <UserAvatar fullname={fullname} username={username} pfp={pfp} />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-700">
                <User
                  className={clsx(
                    "h-5 w-5",
                    isHomePage && !scrolled
                      ? "text-white"
                      : "text-black dark:text-white",
                  )}
                />
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              My Profile: {username}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
