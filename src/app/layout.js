import "./globals.css";

import Script from "next/script";

import { ThemeProvider } from "@/contexts/theme-context";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import LayoutClient from "@/components/layout/layout-client";
import { AuthProvider } from "@/contexts/auth-context";
import { CurrentUserProvider } from "@/contexts/current-user-context";

export const metadata = {
  title: "SkillSwap",
  description: "SkillSwap - A platform for skill exchange",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ContextProvider>
          <LayoutClient>{children}</LayoutClient>
          <Toaster closeButton />
        </ContextProvider>
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

function ContextProvider({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CurrentUserProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </CurrentUserProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
