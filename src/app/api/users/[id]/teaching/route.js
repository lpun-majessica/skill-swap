import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await dbConnect();
  const { skillsToTeach } = await request.json();
  const { id } = await params;
  const returnData = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { skillsToTeach } },
      returnData,
    )
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { skillsToTeach } = await request.json();
  const { id } = await params;
  const returnData = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { skillsToTeach } },
      returnData,
    )
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
