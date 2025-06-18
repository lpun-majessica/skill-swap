import dbConnect from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await dbConnect();
  const { skillId } = await request.json();
  const { id } = await params;
  const returnData = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { skillsToTeach: skillId } },
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
  const { skillId } = await request.json();
  const { id } = await params;
  const returnData = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { skillsToTeach: skillId } },
      returnData,
    )
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
