import "./globals.css";

import { ThemeProvider } from "@/contexts/theme-context";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import LayoutClient from "@/components/layout/layout-client";

import { CurrentUserProvider } from "@/contexts/current-user-context";
import { NavigationProvider } from "@/contexts/navigation-context";
import { NotificationProvider } from "@/contexts/notification-context";
import { ConnectionProvider } from "@/contexts/connection-context";

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
          <Toaster
            closeButton
            toastOptions={{
              style: {
                minWidth: "fit-content",
                maxWidth: "86vw",
                padding: "18px 20px",
              },
            }}
          />
        </ContextProvider>
      </body>
    </html>
  );
}

function ContextProvider({ children }) {
  return (
    <SessionProvider>
      <CurrentUserProvider>
        <ConnectionProvider>
          <NotificationProvider>
            <NavigationProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}
              </ThemeProvider>
            </NavigationProvider>
          </NotificationProvider>
        </ConnectionProvider>
      </CurrentUserProvider>
    </SessionProvider>
  );
}
