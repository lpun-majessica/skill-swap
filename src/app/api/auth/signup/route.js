import dbConnect from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

import hashPassword from "@/utils/hash-password";

export async function POST(request) {
  await dbConnect();

  try {
    let userData = await request.json();
    if (userData.hasOwnProperty("password")) {
      userData = await hashPassword(userData, NextResponse);
    }

    const user = new User(userData);

    let newUser = await user.save();
    newUser = await User.findById(newUser._id)
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
