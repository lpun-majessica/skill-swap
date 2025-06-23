"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

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

  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="dark:bg-ss-black-717 bg-white px-4 pb-4 text-black shadow-lg md:hidden dark:text-white"
    >
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
                "transition-colors",
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
                "transition-colors",
                pathname === "/my-network" &&
                  "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
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
                "transition-color",
                pathname === "/settings" &&
                  "bg-ss-black-29D/30 dark:bg-ss-black-131 font-bold",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span>My Profile</span>
            </Link>
          </div>
          <div className="my-2 h-px w-full bg-gray-200 dark:bg-zinc-800" />

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
