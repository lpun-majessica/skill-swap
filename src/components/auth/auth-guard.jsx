"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthGuard({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/explore");
  }

  return children;
}
