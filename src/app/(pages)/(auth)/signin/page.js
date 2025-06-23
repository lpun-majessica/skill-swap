"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SignInOAuth } from "@/components/auth/signin-oauth";
import { SignInForm } from "@/components/auth/signin-form";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { error } = Object.fromEntries(searchParams);

  useEffect(() => {
    let errorMessage;

    if (error === "CredentialsSignin") {
      errorMessage = "Invalid username or password";
    }
    if (error === "OAuthAccountNotLinked") {
      errorMessage = "This email was not registered using this method";
    }

    if (errorMessage) {
      toast.error(errorMessage);
      router.replace("/signin");
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center px-10 py-20 md:w-auto">
      <h2 className="mb-6 text-2xl font-bold">Sign In</h2>
      <div className="w-[190%] max-w-xs">
        <SignInOAuth />
        <p className="text-ss-black-29D dark:text-ss-light-333/80 mx-4 my-3 flex flex-row text-xs before:m-auto before:mr-1 before:flex-grow before:border-b before:align-middle after:m-auto after:ml-1 after:flex-grow after:border-b after:align-middle md:text-sm">
          OR
        </p>
        <SignInForm />
      </div>
    </div>
  );
}
