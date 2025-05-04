"use client";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/lib/constant";

export default function NavItems({ isHomePage, scrolled, pathname }) {
  return (
    <div className="hidden md:flex gap-6 items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "relative transition px-1 py-2 group focus:outline-none focus:ring-0",
              isHomePage
                ? scrolled
                  ? "text-black dark:text-white"
                  : "text-white"
                : "text-black dark:text-white"
            )}
          >
            {item.label}
            <span
              className={clsx(
                "absolute bottom-0 left-0 w-full h-[2px] transition-opacity duration-300",
                isActive
                  ? "bg-ss-red-505 opacity-100"
                  : "bg-ss-red-505 opacity-0 group-hover:opacity-100"
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
