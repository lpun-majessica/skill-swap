"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login";
  const isHomePage = pathname === "/";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className={!hideLayout && !isHomePage ? "pt-16" : ""}>
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
