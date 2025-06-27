"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-10 py-20 md:w-auto">
      <h2 className="mb-6 text-2xl font-bold">Check your email</h2>
      <div className="flex w-[190%] max-w-xs flex-col items-center gap-10 md:max-w-sm">
        <p className="text-center">
          A sign-in link has been sent to your email address.
        </p>

        <Button
          className="border-ss-black-171 text-ss-black-171 hover:bg-ss-black-171 hover:text-ss-light-777 dark:border-ss-light-333 dark:text-ss-light-333 hover:dark:bg-ss-light-333 hover:dark:text-ss-black-131 w-fit rounded-full border bg-transparent px-6 font-semibold transition-colors duration-150"
          type="button"
          onClick={handleRedirect}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
