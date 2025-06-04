"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function ModeToggle({ isHomePage, scrolled, isLoginPage = false }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const iconColor = isLoginPage
    ? "" // Default styling for login page
    : isHomePage && !scrolled
      ? "text-white hover:text-white"
      : "text-black dark:text-white";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={clsx(iconColor, !scrolled && "hover:bg-ss-black-222/50")}
    >
      <Sun
        className={clsx(
          "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all",
          "dark:scale-0 dark:-rotate-90",
        )}
      />
      <Moon
        className={clsx(
          "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all",
          "dark:scale-100 dark:rotate-0",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
