"use client";

import { redirect } from "next/navigation";

import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";

import { Button } from "../ui/button";

export const SignInOAuth = () => {
  return (
    <>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={() => {
            try {
              signIn(provider.id);
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <Button
            className="bg-ss-light-222 text-ss-black-121 hover:bg-ss-light-333 w-full rounded-full py-2 font-semibold transition"
            type="submit"
          >
            Sign In with {provider.name}
          </Button>
        </form>
      ))}
    </>
  );
};
