"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
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
import { useAuthContext } from "@/contexts/auth-context";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const isHomePage = pathname === "/";

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        isHomePage
          ? scrolled
            ? "bg-white dark:bg-ss-black-717 shadow-md border-gray-200 dark:border-ss-black-131"
            : "bg-transparent border-transparent"
          : "bg-white dark:bg-ss-black-717 border-gray-200 dark:border-ss-black-131"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {isHomePage ? (
              scrolled && !isDarkMode ? (
                <Logo variant="dark" />
              ) : (
                <Logo />
              )
            ) : !isDarkMode ? (
              <Logo />
            ) : (
              <Logo variant="dark" />
            )}
            <span
              className={clsx(
                "font-bold text-lg",
                isHomePage
                  ? scrolled
                    ? "text-black dark:text-white"
                    : "text-white"
                  : "text-black dark:text-white"
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
        </div>

        {/* Right: Login or User Info */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              <Link
                href="/my-network"
                className="px-4 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition"
              >
                My Network
              </Link>
              <Link href="/my-network">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx(
                    isHomePage && !scrolled
                      ? "text-white hover:text-white"
                      : "text-black dark:text-white"
                  )}
                >
                  <Bell />
                </Button>
              </Link>

              {/* Profile dropdown - desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 hover:cursor-pointer rounded-full overflow-hidden focus:outline-none">
                    {currentUser?.pfp ? (
                      <Image
                        src={currentUser.pfp}
                        width={100}
                        height={100}
                        alt={`${currentUser.username}'s Profile`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                        className=
                        {clsx(
                          "w-5 h-5",
                          isHomePage && !scrolled
                            ? "text-white"
                            : "text-black dark:text-white"
                        )}
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      My Profile: {currentUser?.username}
                      {/* add username for easy checking */}
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
              onClick={handleLogin}
              className="px-6 py-1 rounded-full transition text-white bg-ss-red-505 hover:bg-red-700 h-auto border-0 inline-block"
            >
              Log in
            </Button>
          )}
          <ModeToggle isHomePage={isHomePage} scrolled={scrolled} />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ModeToggle isHomePage={isHomePage} scrolled={scrolled} />

          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            variant="ghost"
            size="icon"
            className={clsx(
              "focus:ring-0",
              isHomePage && !scrolled
                ? "text-white hover:text-white"
                : "text-black dark:text-white"
            )}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
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
      )}
    </nav>
  );
}
