import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({})
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request) {
  await dbConnect();
  const userData = await request.json();
  const user = new User(userData);

  try {
    let newUser = await user.save();
    newUser = await User.findById(newUser._id)
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
