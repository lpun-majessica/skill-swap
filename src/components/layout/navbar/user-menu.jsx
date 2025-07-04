"use client";

import { useSession } from "next-auth/react";
import { useCurrentUserContext } from "@/contexts/current-user-context";
import { useNavigationContext } from "@/contexts/navigation-context";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-card/avatar";
import NotificationFeed from "@/components/notification/notification-feed";

export default function UserMenu({ className }) {
  const { data } = useSession();
  const { currentUser, isLoading } = useCurrentUserContext();
  const { handleSignIn, handleSignOut } = useNavigationContext();

  if (!data || isLoading) {
    return (
      <Button
        onClick={handleSignIn}
        className="bg-ss-red-505 inline-block h-auto rounded-full border-0 px-6 py-1.5 text-white transition hover:bg-red-700 lg:py-2"
      >
        Sign In
      </Button>
    );
  }

  const { username, pfp } = currentUser;

  return (
    <div className={className}>
      <Button
        asChild
        className="bg-ss-red-505 h-8 rounded-full px-4 text-white transition hover:bg-red-700 lg:h-9"
      >
        <Link href="/my-network">My Network</Link>
      </Button>

      <NotificationFeed />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="mr-2 size-8 overflow-hidden rounded-full hover:cursor-pointer focus:outline-none md:mr-4">
            <UserAvatar username={username} pfp={pfp} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/my-profile" className="cursor-pointer">
              My Profile{username && `: ${username}`}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="border-1" />

          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
