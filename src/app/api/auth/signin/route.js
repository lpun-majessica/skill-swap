import bcrypt from "bcrypt";

import dbConnect from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  const signinUrl = new URL("/signin", request.url);
  return NextResponse.redirect(signinUrl);
}

export async function POST(request) {
  await dbConnect();

  const { username, password } = await request.json();

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  const isCorrectPassword = await bcrypt.compare(
    password,
    user?.passwordHash ?? "",
  );

  if (!isCorrectPassword) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  }

  const userForToken = {
    id: user._id,
    username: user.username,
    fullname: user.fullname,
    pfp: user.pfp.url,
  };

  try {
    return NextResponse.json(userForToken, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
