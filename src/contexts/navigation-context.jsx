"use client";

import { disconnectSocket } from "@/lib/socket";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState } from "react";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [scrolled, setScrolled] = useState(true);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 50);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignOut = () => {
    disconnectSocket(data.user);
    signOut();
  };

  return (
    <NavigationContext.Provider
      value={{ scrolled, pathname, isHomePage, handleSignIn, handleSignOut }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider",
    );
  }
  return context;
}
