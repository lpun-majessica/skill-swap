"use client";

import Image from "next/image";
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

export default function UserMenu({
  currentUser,
  handleLogin,
  handleLogout,
  isHomePage,
  scrolled,
}) {
  if (!currentUser) {
    return (
      <Button
        onClick={handleLogin}
        className="px-6 py-1 rounded-full transition text-white bg-ss-red-505 hover:bg-red-700 h-auto border-0 inline-block"
      >
        Log in
      </Button>
    );
  }

  return (
    <>
      <Link
        href="/my-network"
        className="px-4 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition"
      >
        My Network
      </Link>

      {/* Profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-8 h-8 hover:cursor-pointer rounded-full overflow-hidden focus:outline-none">
            {currentUser?.pfp ? (
              <Image
                src={currentUser.pfp}
                width={100}
                height={100}
                alt={`${currentUser.username}'s Profile`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                <User
                  className={clsx(
                    "w-5 h-5",
                    isHomePage && !scrolled
                      ? "text-white"
                      : "text-black dark:text-white"
                  )}
                />
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              My Profile: {currentUser?.username}
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
