"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";
import { ModeToggle } from "@/components/common/mode-toggle";
import { toast } from "sonner";
import Logo, { WhiteLogo } from "@/components/layout/logo";
import Link from "next/link";
import { useField } from "@/hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignin } from "@/components/auth/google-signin";

export default function LoginPage() {
  const username = useField("text");
  const password = useField("password");

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
    if (login(username.value, password.value)) {
      router.push("/explore");
    } else {
      toast.error(<span>Username or password is invalid!</span>);
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden font-sans md:grid-cols-5">
      {/* Left Side: Hidden on Mobile */}
      <div className="relative col-span-2 hidden flex-col overflow-visible bg-red-600 text-white md:block">
        <div className="flex items-center gap-2 p-9 text-lg font-bold">
          <WhiteLogo />
          <span>SkillSwap</span>
        </div>

        <div className="relative z-10 flex h-[20%] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-2xl font-bold">Welcome back!</h1>
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
          <form className="w-[190%] max-w-xs" onSubmit={handleLogin}>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                {...username}
                placeholder="Enter username"
                className="mb-4 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                {...password}
                placeholder="Enter password"
                className="mb-6 w-full rounded-full border border-gray-300 px-4 py-4 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Sign In
            </button>
            <GoogleSignin />

            <p className="mt-4 text-center text-sm">
              <a href="#" className="text-red-600 underline">
                Reset password
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
