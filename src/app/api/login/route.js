import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dbConnect from "@/lib/db-connect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  const { username, password } = await request.json();
  const user = await User.findOne({ username });

  const isCorrectPassword = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  try {
    const token = jwt.sign(userForToken, process.env.SECRET);
    console.log(token);

    return NextResponse.json({ token, id: user.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
