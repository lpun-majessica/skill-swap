import { auth } from "@/auth";
import { ModeToggle } from "@/components/common/mode-toggle";
import Logo, { WhiteLogo } from "@/components/layout/logo";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const session = await auth();

  if (session) {
    redirect("/explore");
  }

  const header = await headers();
  const path = header.get("referer");

  const title = `Welcome ${path && path.endsWith("signup") ? "to SkillSwap" : "back"}!`;

  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden font-sans md:grid-cols-5">
      {/* Left Side: Hidden on Mobile */}
      <div className="relative col-span-2 hidden flex-col overflow-visible bg-red-600 text-white md:block">
        <div className="flex items-center gap-2 p-9 text-lg font-bold">
          <WhiteLogo />
          <Link href="/">SkillSwap</Link>
        </div>

        <div className="relative z-10 flex h-[20%] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-2xl font-bold">{title}</h1>
          <p className="text-xl">Time to enhance your tech skills</p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-full overflow-visible">
          <img
            src="/login-1.svg"
            alt="Pending card"
            className="absolute -bottom-10 left-1/2 h-auto w-[120%] max-w-3xl min-w-lg translate-x-[-40%] object-contain lg:-bottom-20"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="relative z-0 col-span-3 flex justify-center bg-white md:col-span-3 dark:bg-[oklch(0.145_0_0)]">
        <div className="absolute -top-5.5 -left-5 flex w-full items-center justify-between md:top-5">
          <div className="text-left">
            <Link
              href="/"
              className="visible flex items-center gap-2 p-9 text-left font-bold md:hidden"
            >
              <Logo />
              <span className="text-lg font-bold">SkillSwap</span>
            </Link>
          </div>
          <div className="text-right">
            <ModeToggle isLoginPage={true} />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
