"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function ModeToggle({ isHomePage, scrolled }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const iconColor = isHomePage && !scrolled
    ? "text-white hover:text-white"
    : "text-black dark:text-white";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={clsx(iconColor)}
    >
      <Sun
        className={clsx(
          "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all",
          "dark:-rotate-90 dark:scale-0"
        )}
      />
      <Moon
        className={clsx(
          "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
          "dark:rotate-0 dark:scale-100"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
