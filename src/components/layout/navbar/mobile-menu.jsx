"use client";

import { useSession } from "next-auth/react";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/utils/constant";
import { Button } from "@/components/ui/button";

export default function MobileMenu({
  pathname,
  handleSignIn,
  handleSignOut,
  setMenuOpen,
}) {
  const { data } = useSession();

  return (
    <div className="dark:bg-ss-black-717 bg-white px-4 pb-4 text-black shadow-lg md:hidden dark:text-white">
      <div className="w-full pt-2" />

      {/* Main navigation items */}
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div key={item.href} className="w-full">
            <Link
              href={item.href}
              className={clsx(
                "my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm",
                "transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800",
                "focus:bg-gray-100 focus:outline-none dark:focus:bg-zinc-800",
                isActive && "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
            </Link>
          </div>
        );
      })}

      {data ? (
        <>
          <SeparatorLine />

          {/* User specific options */}
          <div className="w-full">
            <Link
              href="/my-network"
              className={clsx(
                "my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm",
                "transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800",
                pathname === "/my-network" && "font-bold",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span>My Network</span>
            </Link>
          </div>

          <div className="w-full">
            <Link
              href="/settings"
              className={clsx(
                "my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm",
                "transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800",
                pathname === "/settings" && "font-bold",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span>My Profile</span>
            </Link>
          </div>
          <div className="my-2 h-px w-full bg-gray-200 dark:bg-zinc-800" />

          <SeparatorLine />

          <Link
            className="my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
            href="/reset-password"
            asChild
          >
            <span>Reset Password</span>
          </Link>
          <div className="w-full">
            <button
              onClick={handleSignOut}
              className="my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <div className="mt-2 flex w-full justify-center px-4">
          <Button
            onClick={handleSignIn}
            className="bg-ss-red-505 mt-2 inline-block h-auto rounded-full border-0 px-6 py-2 text-white transition hover:bg-red-700"
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}

function SeparatorLine() {
  return <div className="my-2 h-px w-full bg-gray-200 dark:bg-zinc-800" />;
}
