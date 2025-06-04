"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
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
  const { logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
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

  const isHomePage = pathname === "/";

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
        <div className="flex items-center gap-8">
          {/* Logo with Link */}
          <Link href="/" className="flex items-center gap-2">
            <Logo isHomePage={isHomePage} scrolled={scrolled} />
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
          <NavItems
            isHomePage={isHomePage}
            scrolled={scrolled}
            pathname={pathname}
          />
        </div>

        {/* Right: Login or User Info */}
        <div className="hidden items-center gap-4 md:flex">
          <UserMenu
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isHomePage={isHomePage}
            scrolled={scrolled}
          />
          <ModeToggle isHomePage={isHomePage} scrolled={scrolled} />
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle isHomePage={isHomePage} scrolled={scrolled} />

          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            variant="ghost"
            size="icon"
            className={clsx(
              "focus:ring-0",
              isHomePage && !scrolled
                ? "text-white hover:text-white"
                : "text-black dark:text-white",
            )}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <MobileMenu
          pathname={pathname}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          setMenuOpen={setMenuOpen}
        />
      )}
    </nav>
  );
}
