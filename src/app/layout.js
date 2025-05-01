import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/contexts/data-context";
import { AuthProvider } from "@/contexts/auth-context";
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
        <AuthProvider>
          <DataProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <LayoutClient>{children}</LayoutClient>
              <Toaster />
            </ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
