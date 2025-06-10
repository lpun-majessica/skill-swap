import "./globals.css";

import Script from "next/script";

import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { CurrentUserProvider } from "@/contexts/current-user-context";
import { ConnectionProvider } from "@/contexts/connection-context";
import { UserProvider } from "@/contexts/users-context";
import { SkillProvider } from "@/contexts/skill-context";

import { Toaster } from "@/components/ui/sonner";
import LayoutClient from "@/components/layout/layout-client";

export const metadata = {
  title: "SkillSwap",
  description: "SkillSwap - A platform for skill exchange",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ContextProvider>
          <LayoutClient>{children}</LayoutClient>
          <Toaster />
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
    <AuthProvider>
      <SkillProvider>
        <CurrentUserProvider>
          <ConnectionProvider>
            <UserProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}
              </ThemeProvider>
            </UserProvider>
          </ConnectionProvider>
        </CurrentUserProvider>
      </SkillProvider>
    </AuthProvider>
  );
}
