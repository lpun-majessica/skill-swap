"use client";

import { redirect } from "next/navigation";

import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";

import { Button } from "../ui/button";

const BrandIcons = ({ name }) => {
  switch (name) {
    case "google": {
      return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Google</title>
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      );
    }
    case "github": {
      return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    }

    default: {
      return;
    }
  }
};

export const SignInOAuth = () => {
  return (
    <div className="flex flex-col gap-3">
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
            <BrandIcons name={provider.id} />
            Sign In with {provider.name}
          </Button>
        </form>
      ))}
    </div>
  );
};
