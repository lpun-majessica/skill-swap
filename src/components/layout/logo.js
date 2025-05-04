"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Logo({
  isHomePage,
  scrolled,
  isDarkMode,
  displayOption,
  standalone = true, // Changed default to true
  href = "/",
}) {
  // Determine which logo variant to use based on context
  let variant = "light";

  if (isHomePage) {
    // On homepage, use dark variant only when scrolled and not in dark mode
    if (scrolled && !isDarkMode) {
      variant = "dark";
    }
  } else {
    // On other pages, use dark variant when not in dark mode
    if (!isDarkMode) {
      variant = "dark";
    }
  }

  const logoSrc = variant === "light" ? "/logo-white.svg" : "/logo-dark.svg";

  // The logo image component
  const LogoImage = (
    <Image
      src={logoSrc}
      alt="SkillSwap Logo"
      width={32}
      height={32}
      className={clsx("w-8 h-8", displayOption)}
    />
  );

  // If standalone is true, just return the logo image
  if (standalone) {
    return LogoImage;
  }

  // Otherwise, return the logo with text (but NOT in a Link)
  return (
    <>
      {LogoImage}
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
    </>
  );
}
