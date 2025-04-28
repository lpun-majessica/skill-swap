import { ModeToggle } from "@/components/common/mode-toggle";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from '@/contexts/data-context';
import { AuthProvider } from '@/contexts/auth-context';
import Navbar from '@/components/navbar';

export const metadata = {
  title: "SkillSwap",
  description: "SkillSwap - A platform for skill exchange",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <AuthProvider>
          <DataProvider>
            <ThemeProvider>
            <Navbar />
              {children}
            </ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
