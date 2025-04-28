import { ModeToggle } from "@/components/common/mode-toggle";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "SkillSwap",
  description: "SkillSwap - A platform for skill exchange",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <nav>
            <div className="flex items-center justify-between shadow-2xl shadow-accent p-4 ">
              <div className="text-lg font-bold">SkillSwap</div>
              <div className="flex space-x-4">
                <ModeToggle />
              </div>
            </div>
          </nav>
          {children}
          <Toaster expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
