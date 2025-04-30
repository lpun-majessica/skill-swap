"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "./logo";
import { useTheme } from "next-themes";
import { ModeToggle } from "../common/mode-toggle";
import { navItems } from "@/lib/constant";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle for demo purposes

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For demo, toggle login state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white dark:bg-ss-black-717 shadow-md border-gray-200 dark:border-ss-black-131"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {scrolled && !isDarkMode ? <Logo variant="dark" /> : <Logo />}
            <span
              className={clsx(
                "font-bold text-lg",
                scrolled ? "text-black dark:text-white" : "text-white"
              )}
            >
              SkillSwap
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative transition px-1 py-2 group focus:outline-none focus:ring-0",
                    scrolled ? "text-black dark:text-white" : "text-white"
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
        </div>

        {/* Right: Login or User Info */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/my-network"
                className="px-4 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition"
              >
                My Network
              </Link>
              <Link href="/my-network">
                <Button variant="ghost" size="icon">
                  <Bell />
                </Button>
              </Link>

              {/* Profile dropdown - desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-full overflow-hidden focus:outline-none">
                    <Image
                      src="/pfp/1.jpeg"
                      width={100}
                      height={100}
                      alt="User Profile"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={toggleLogin}
              className="px-6 py-1 rounded-full transition text-white bg-ss-red-505 hover:bg-red-700 h-auto border-0 inline-block"
            >
              Log in
            </Button>
          )}
          <ModeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            variant="ghost"
            size="icon"
            className="focus:ring-0"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-black text-black dark:text-white shadow-lg">
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

          {isLoggedIn ? (
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
                  <span>My Connection</span>
                </Link>
              </div>

              <div className="w-full">
                <Link
                  href="/my-network"
                  className="flex justify-start px-4 py-2 text-sm rounded-md w-full my-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Notification</span>
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
                  <span>Log Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full mt-2 px-4 flex justify-center">
              <Button
                onClick={toggleLogin}
                className="px-6 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition h-auto border-0 inline-block"
              >
                Log in
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
