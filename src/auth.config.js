import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";

import authService from "@/services/auth";

const providers = [
  Google,
  Github,
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: "SkillSwap <onboarding@resend.dev>",
    // sendVerificationRequest, // For customised emails
  }),
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
  async jwt({ token, user, isNewUser }) {
    if (isNewUser) {
      const userData = {};
      try {
        const { id, email, name, image } = user;
        const username = email.slice(0, email.search("@"));

        userData.id = id;
        userData.email = email;
        userData.username = username;
        userData.fullname = name ?? username;
        if (image) userData.pfp = { url: image };

        await authService.signUp(userData);
      } catch (error) {
        console.log(error.message);
      }
    }

    if (user) {
      token.user = user.id;
    }

    return token;
  },
};

export default {
  providers,
  callbacks,
};
