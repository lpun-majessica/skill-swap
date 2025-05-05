"use client";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/lib/constant";
import { Button } from "@/components/ui/button";

export default function MobileMenu({
  currentUser,
  pathname,
  handleLogin,
  handleLogout,
  setMenuOpen,
}) {
  return (
    <div className="md:hidden px-4 pb-4 bg-white dark:bg-ss-black-717 text-black dark:text-white shadow-lg">
      <div className="w-full pt-2" />

      {/* Main navigation items */}
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div key={item.href} className="w-full">
            <Link
              href={item.href}
              className={clsx(
                "flex justify-start px-4 py-2 text-sm rounded-md w-full my-1",
                "hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors",
                "focus:outline-none focus:bg-gray-100 dark:focus:bg-zinc-800",
                isActive && "font-bold"
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
          <div className="h-px bg-gray-200 dark:bg-zinc-800 my-2 w-full" />

          {/* User specific options */}
          <div className="w-full">
            <Link
              href="/my-network"
              className={clsx(
                "flex justify-start px-4 py-2 text-sm rounded-md w-full my-1",
                "hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors",
                pathname === "/my-network" && "font-bold"
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
                "flex justify-start px-4 py-2 text-sm rounded-md w-full my-1",
                "hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors",
                pathname === "/settings" && "font-bold"
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span>My Profile</span>
            </Link>
          </div>

          <div className="w-full">
            <button
              onClick={handleLogout}
              className="flex justify-start px-4 py-2 text-sm rounded-md w-full my-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div className="w-full mt-2 px-4 flex justify-center">
          <Button
            onClick={handleLogin}
            className="px-6 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition h-auto border-0 inline-block"
          >
            Log in
          </Button>
        </div>
      )}
    </div>
  );
}
