"use client";

import Image from "next/image";
import clsx from "clsx";

export default function Logo({ isHomePage, scrolled, displayOption }) {
  return (
    <>
      {/* Light logo (white) - visible by default on homepage when not scrolled,
          and in dark mode on all other pages */}
      <Image
        src="/logo-white.svg"
        alt="SkillSwap Logo"
        width={32}
        height={32}
        className={clsx(
          "w-8 h-8",
          displayOption,
          isHomePage
            ? scrolled
              ? "hidden dark:block"
              : "block"
            : "hidden dark:block"
        )}
      />

      {/* Dark logo - visible when scrolled on homepage (except in dark mode),
          and in light mode on all other pages */}
      <Image
        src="/logo-dark.svg"
        alt="SkillSwap Logo"
        width={32}
        height={32}
        className={clsx(
          "w-8 h-8",
          displayOption,
          isHomePage
            ? scrolled
              ? "block dark:hidden"
              : "hidden"
            : "block dark:hidden"
        )}
      />
    </>
  );
}

export function WhiteLogo({ className = "" }) {
  return (
    <>
      {/* White logo only for login page left side */}
      <Image
        src="/logo-white.svg"
        alt="SkillSwap Logo"
        width={32}
        height={32}
        className={clsx("w-8 h-8", className)}
      />
    </>
  );
}
