import dbConnect from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const searchParams = request.nextUrl.searchParams;

  try {
    if (searchParams) {
      const query = Object.fromEntries(searchParams);
      const isExisted = !!(await User.findOne(query));

      return NextResponse.json({ isExisted }, { status: 200 });
    }

    const users = await User.find({})
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
