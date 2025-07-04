"use client";

import { useNavigationContext } from "@/contexts/navigation-context";

import Link from "next/link";
import clsx from "clsx";
import { navItems } from "@/utils/constant";

import { Button } from "@/components/ui/button";

export default function NavItems() {
  const { pathname, scrolled, isHomePage } = useNavigationContext();

  return (
    <div className="hidden items-center gap-3 sm:flex md:gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Button
            asChild
            variant="link"
            key={item.href}
            className={clsx(
              "group relative w-15 px-1 py-2 transition hover:no-underline focus:ring-0 focus:outline-none",
              isHomePage
                ? scrolled
                  ? "text-black dark:text-white"
                  : "text-white"
                : "text-black dark:text-white",
            )}
          >
            <Link href={item.href}>
              {item.label}
              <span
                className={clsx(
                  "absolute -bottom-1 left-0 h-[2px] w-full transition-opacity duration-300",
                  isActive
                    ? "bg-ss-red-505 opacity-100"
                    : "bg-ss-red-505 opacity-0 group-hover:opacity-100",
                )}
              />
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
