"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { SignUpForm } from "@/components/auth/signup-form";
import { toast } from "sonner";

export default function SignUpPage() {
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
      <h2 className="mb-6 text-2xl font-bold">Sign Up</h2>
      <div className="w-[190%] max-w-xs">
        <SignUpForm />

        <div className="mt-4 text-center text-sm font-semibold">
          Already have an account?
          <Link
            href="/signin"
            className="ml-3 text-red-600 underline hover:no-underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
