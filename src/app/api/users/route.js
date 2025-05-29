import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
