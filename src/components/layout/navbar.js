"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { ModeToggle } from "../common/mode-toggle";
import { useAuthContext } from "@/contexts/auth-context";

import Link from "next/link";
import Logo from "./logo";
import NavItems from "./navbar/nav-item";
import UserMenu from "./navbar/user-menu";
import MobileMenu from "./navbar/mobile-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuthContext();
  const { resolvedTheme } = useTheme();

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

  let isDarkMode;
  switch (resolvedTheme) {
    case "light": {
      isDarkMode = false;
      break;
    }
    case "dark": {
      isDarkMode = true;
      break;
    }
    default: {
      isDarkMode = false;
      break;
    }
  }

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
          {/* Logo with Link */}
          <Link href="/" className="flex items-center gap-2">
            <Logo
              standalone={true}
              isHomePage={isHomePage}
              scrolled={scrolled}
              isDarkMode={isDarkMode}
            />
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

          {/* Desktop Navigation Items */}
          <NavItems
            isHomePage={isHomePage}
            scrolled={scrolled}
            pathname={pathname}
          />
        </div>

        {/* Right: Login or User Info */}
        <div className="hidden md:flex items-center gap-4">
          <UserMenu
            currentUser={currentUser}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isHomePage={isHomePage}
            scrolled={scrolled}
          />
          <ModeToggle isHomePage={isHomePage} scrolled={scrolled} />
        </div>

        {/* Mobile menu toggle */}
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
        <MobileMenu
          currentUser={currentUser}
          pathname={pathname}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          setMenuOpen={setMenuOpen}
        />
      )}
    </nav>
  );
}
