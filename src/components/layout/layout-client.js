"use client";

import { useNavigationContext } from "@/contexts/navigation-context";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const noLayoutPages = new Set(["/signin", "/verify-email"]);

export default function LayoutClient({ children }) {
  const { pathname, isHomePage } = useNavigationContext();
  const hideLayout = noLayoutPages.has(pathname);

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
