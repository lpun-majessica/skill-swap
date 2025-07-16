import { NextResponse } from "next/server";

import { auth } from "@/auth";

const checkSession = async () => {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "user not signed in" }, { status: 401 });
  }
};

export default checkSession;
