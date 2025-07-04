"use client";

import { useNavigationContext } from "@/contexts/navigation-context";

import { ModeToggle } from "../common/mode-toggle";

import clsx from "clsx";
import Link from "next/link";
import Logo from "./logo";
import NavItems from "./navbar/nav-item";
import UserMenu from "./navbar/user-menu";
import MobileMenu from "./navbar/mobile-menu";

export default function Navbar() {
  const { scrolled, isHomePage } = useNavigationContext();

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 z-50 w-screen border-b transition-all duration-300",
        isHomePage & !scrolled
          ? "border-transparent bg-transparent"
          : "dark:bg-ss-black-717 dark:border-ss-black-131 border-gray-200 bg-white shadow-md",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-5 md:gap-10">
          {/* Logo with Link */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span
              className={clsx(
                "text-lg font-bold",
                isHomePage
                  ? scrolled
                    ? "text-black dark:text-white"
                    : "text-white"
                  : "text-black dark:text-white",
              )}
            >
              SkillSwap
            </span>
          </Link>

          {/* Desktop Navigation Items */}
          <NavItems />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <UserMenu className="hidden items-center gap-2 sm:flex md:gap-3" />
          <span className="border-ss-black-171 hidden h-7 w-0 border sm:block" />
          <ModeToggle />
          <span className="border-ss-black-171 h-7 w-0 border sm:hidden" />
          <MobileMenu className="flex items-center sm:hidden" />
        </div>
      </div>
    </nav>
  );
}
