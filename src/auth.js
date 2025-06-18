import NextAuth from "next-auth";
import { signIn as authSignIn } from "next-auth/react";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import authService from "@/services/auth";
import userService from "@/services/user";

const session = { strategy: "jwt" };
const providers = [
  Google,
  Credentials({
    credentials: {
      username: {},
      password: {},
    },
    authorize: async (credentials) => {
      try {
        let user = null;
        const { username, password } = credentials;

        user = await authService.signIn(username, password);
        return user;
      } catch (error) {
        return null;
      }
    },
  }),
];

const callbacks = {
  async session({ session, token }) {
    session.user = token.user;
    return session;
  },
  async jwt({ token, user, account }) {
    if (user && account.provider === "google") {
      const { name, email, image } = user;
      const fullname = name;
      const username = email?.slice(0, email.search("@"));
      const pfp = image;

      const userData = { fullname, username, pfp };
      token.user = userData;
    }

    if (user && account.provider !== "google") {
      token.user = user;
    }

    return token;
  },
};

const events = {
  async signIn({ account, profile }) {
    if (account.provider === "google") {
      const { email, name, picture } = profile;
      const username = email.slice(0, email.search("@"));
      const query = { email };

      try {
        const { isExisted } = await userService.findUser(query);

        if (!isExisted) {
          const userData = {
            email,
            username,
            fullname: name,
            pfp: { url: picture },
          };

          await authService.signUp(userData);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const signIn = (provider, options = {}) =>
  authSignIn(provider, { ...options, redirectTo: "/explore" });

export const { handlers, auth } = NextAuth({
  session,
  providers,
  callbacks,
  events,
  pages: { signIn: "/signin", newUser: "/settings" },
});
