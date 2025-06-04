import dbConnect from "@/lib/db-connect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import hashPassword from "@/utils/hash-password";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({})
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function POST(request) {
  await dbConnect();
  let userData = await request.json();
  userData = await hashPassword(userData, NextResponse);

  const user = new User(userData);

  try {
    let newUser = await user.save();
    newUser = await User.findById(newUser._id)
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
