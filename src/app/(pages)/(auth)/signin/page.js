"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { SignInOAuth } from "@/components/auth/signin-oauth";
import { SignInForm } from "@/components/auth/signin-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const { data } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { error } = Object.fromEntries(searchParams);

  useEffect(() => {
    if (error === "CredentialsSignin") {
      toast.error("Invalid username or password");
      router.push("/signin");
    }
  }, []);

  useEffect(() => {
    let toastId;
    if (data) {
      toastId = toast.success("Login Successful");
      router.push("/explore");
    }

    return () => toast.dismiss(toastId);
  });

  return (
    <div className="flex w-full flex-col items-center justify-center px-10 py-20 md:w-auto">
      <h2 className="mb-6 text-2xl font-bold">Sign In</h2>
      <div className="w-[190%] max-w-xs">
        <SignInOAuth />
        <p className="text-ss-black-29D dark:text-ss-light-333/80 mx-4 my-3 flex flex-row text-xs before:m-auto before:mr-1 before:flex-grow before:border-b before:align-middle after:m-auto after:ml-1 after:flex-grow after:border-b after:align-middle md:text-sm">
          OR
        </p>
        <SignInForm />

        {/* <Button
          variant="outline"
          className="border-ss-black-171 dark:border-ss-light-333-171 hover:dark:bg-ss-black-222 mt-1 mb-3 w-full rounded-full border-1 py-2 font-semibold transition"
        >
          Forgot your password?
        </Button> */}
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link
            href="/signup"
            className="ml-3 text-red-600 underline hover:no-underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
