import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-ss-black-717 dark:border-ss-black-929 w-full border-t border-gray-200 bg-white py-8 text-black dark:text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 md:flex-row">
        <div className="mb-4 flex gap-4 md:mb-0">
          <Link href="/" className="mb-6 flex items-center gap-2 md:mb-0">
            <Logo />
            <span className="text-lg font-bold">SkillSwap</span>
          </Link>
        </div>

        <div className="text-sm">
          ©{currentYear} SkillSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
