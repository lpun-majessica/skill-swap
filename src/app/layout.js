import { ModeToggle } from "@/components/common/mode-toggle";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "SkillSwap",
  description: "SkillSwap - A platform for skill exchange",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <nav>
            <div className="flex items-center justify-between shadow-2xl shadow-accent p-4 ">
              <div className="text-lg font-bold">SkillSwap</div>
              <div className="flex space-x-4">
                <ModeToggle />
              </div>
            </div>
          </nav> */}
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
