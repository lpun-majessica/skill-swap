"use client";

import Image from "next/image";

export default function Logo({ variant = "light" }) {
  const logoSrc = variant === "light" ? "/logo-white.svg" : "/logo-dark.svg";

  return (
    <Image
      src={logoSrc}
      alt="SkillSwap Logo"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  );
}
