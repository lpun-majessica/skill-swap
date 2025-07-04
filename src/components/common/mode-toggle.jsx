"use client";

import { useNavigationContext } from "@/contexts/navigation-context";
import { useTheme } from "next-themes";

import clsx from "clsx";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { scrolled, isHomePage } = useNavigationContext();

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const iconColor =
    isHomePage && !scrolled
      ? "text-white hover:text-white"
      : "text-black dark:text-white";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={clsx(
        iconColor,
        !scrolled && "hover:bg-ss-black-171/30 hover:dark:bg-ss-black-171/50",
      )}
    >
      <Sun className="size-4 scale-100 dark:scale-0" />
      <Moon className="absolute size-4 scale-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
