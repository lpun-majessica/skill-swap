"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const noLayoutPages = new Set(["/signin", "/signup", "/reset-password"]);

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideLayout = noLayoutPages.has(pathname);
  const isHomePage = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      {!hideLayout && <Navbar />}
      <main
        className={`${
          !hideLayout && !isHomePage ? "pt-16" : ""
        } grow overflow-auto`}
      >
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}
