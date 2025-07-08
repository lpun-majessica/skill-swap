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

import { CircleUserRound, LogIn, LogOut, UsersRound } from "lucide-react";

export default function UserMenu({ className }) {
  const { data } = useSession();
  const { currentUser, isLoading } = useCurrentUserContext();
  const { handleSignOut } = useNavigationContext();

  if (!data || isLoading) {
    return (
      <Button
        asChild
        className="bg-ss-red-505 hidden h-8 w-fit rounded-full px-6 font-semibold text-white transition hover:bg-red-700 sm:flex lg:h-9"
      >
        <Link href="/signin">
          <LogIn className="mt-0.5" />
          Sign In
        </Link>
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
        <Link href="/my-network">
          <UsersRound />
          My Network
        </Link>
      </Button>

      <NotificationFeed />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="mr-2 size-8 overflow-hidden rounded-full hover:cursor-pointer focus:outline-none md:mr-4">
            <UserAvatar username={username} pfp={pfp} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={5}
          alignOffset={-25}
          className="bg-ss-black-121 w-40"
        >
          <DropdownMenuItem asChild>
            <Link href="/my-profile" className="cursor-pointer">
              <CircleUserRound className="size-5" />
              My Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="border-1" />

          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            <LogOut className="size-5" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
