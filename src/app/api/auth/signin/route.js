import dbConnect from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  const signinUrl = new URL("/signin", request.url);
  return NextResponse.redirect(signinUrl);
}

export async function POST(request) {
  await dbConnect();

  const { username } = await request.json();

  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  if (!user) {
    throw new Error("No user found");
  }

  const loggedInUser = {
    id: user._id,
  };

  try {
    return NextResponse.json(loggedInUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
