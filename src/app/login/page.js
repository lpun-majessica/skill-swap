"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";
import { ModeToggle } from "@/components/common/mode-toggle";
import { toast } from "sonner";
import Logo, { WhiteLogo } from "@/components/layout/logo";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { login, currentUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace("/explore");
    }
  }, [isLoading, currentUser, router]);

  if (isLoading || currentUser) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username)) {
      router.push("/explore");
    } else {
      toast.error(<span>Username or password is invalid!</span>);
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden font-sans md:grid-cols-5">
      {/* Left Side: Hidden on Mobile */}
      <div className="relative col-span-2 hidden overflow-visible bg-red-600 text-white md:block">
        <div className="flex items-center gap-2 p-9 text-lg font-bold">
          <WhiteLogo />
          <span>SkillSwap</span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-2xl font-bold">Welcome back!</h1>
          <p className="text-xl">Time to enhance your tech skills</p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-full overflow-visible">
          <img
            src="/pfp/login-1.svg"
            alt="Pending card"
            className="absolute bottom-[-70px] left-1/2 h-auto w-[120%] max-w-none translate-x-[-50%] object-contain"
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="relative z-0 col-span-3 flex justify-center bg-white md:col-span-3 dark:bg-[oklch(0.145_0_0)]">
        <div className="absolute right-5 z-10 flex w-full items-center justify-between p-10">
          <div className="text-left">
            <Link
              href="/"
              className="visible flex items-center gap-2 p-9 text-left font-bold md:hidden"
            >
              <Logo />
              <span>SkillSwap</span>
            </Link>
          </div>
          <div className="text-right">
            <ModeToggle isLoginPage={true} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center px-10 py-20 md:w-auto">
          <h2 className="mb-6 text-2xl font-bold">Sign in</h2>
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="your username"
              className="mb-4 w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="***********"
              className="mb-6 w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Sign In
            </button>
            <p className="mt-4 text-center text-sm">
              <a href="#" className="text-red-600 underline">
                Forgot password?
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
