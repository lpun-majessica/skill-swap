"use client";

import { useSession } from "next-auth/react";

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

export default function UserMenu({
  handleSignIn,
  handleSignOut,
  isHomePage,
  scrolled,
}) {
  const { data } = useSession();

  if (!data) {
    return (
      <Button
        onClick={handleSignIn}
        className="bg-ss-red-505 inline-block h-auto rounded-full border-0 px-6 py-2 text-white transition hover:bg-red-700"
      >
        Sign In
      </Button>
    );
  }

  const { fullname, username, pfp } = data.user;

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

          <DropdownMenuSeparator className="border-1" />
          <DropdownMenuItem asChild>
            <Link href="/reset-password" className="cursor-pointer">
              Reset Password
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="mx-2" />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
