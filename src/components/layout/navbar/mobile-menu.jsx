"use client";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth-context";

export default function MobileMenu({
  pathname,
  handleLogin,
  handleLogout,
  setMenuOpen,
}) {
  const { currentUser } = useAuthContext();

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
                isActive && "font-bold",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
            </Link>
          </div>
        );
      })}

      {currentUser ? (
        <>
          {/* Separator line */}
          <div className="my-2 h-px w-full bg-gray-200 dark:bg-zinc-800" />

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

          <div className="w-full">
            <button
              onClick={handleLogout}
              className="my-1 flex w-full justify-start rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div className="mt-2 flex w-full justify-center px-4">
          <Button
            onClick={handleLogin}
            className="bg-ss-red-505 inline-block h-auto rounded-full border-0 px-6 py-1 text-white transition hover:bg-red-700"
          >
            Log in
          </Button>
        </div>
      )}
    </div>
  );
}
