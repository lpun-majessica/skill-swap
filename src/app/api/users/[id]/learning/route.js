import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await dbConnect();
  const { skillsToLearn } = await request.json();
  const { id } = await params;
  const returnData = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { skillsToLearn } },
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
  const { skillsToLearn } = await request.json();
  const { id } = await params;
  const returnData = { new: true };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { skillsToLearn } },
      returnData,
    )
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
