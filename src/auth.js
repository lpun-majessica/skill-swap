import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { signIn as authSignIn } from "next-auth/react";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma/prisma";

export const providerMap = authConfig.providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter(
    (provider) => provider.id !== "credentials" && provider.id !== "resend",
  );

export const signIn = (provider, options = {}) =>
  authSignIn(provider, { ...options, redirectTo: "/explore" });

export const { handlers, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/signin", newUser: "/explore?isNewUser=true" },
  ...authConfig,
});
