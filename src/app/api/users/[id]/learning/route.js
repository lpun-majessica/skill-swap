import { dbConnect } from "@/lib/db";
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
      { $addToSet: { skillsToLearn: skillId } },
      returnData,
    )
      .populate("skillsToLearn")
      .populate("skillsToTeach");

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { skillId } = await request.json();
  const { id } = await params;

  try {
    await User.findByIdAndUpdate(
      id,
      { $pull: { skillsToLearn: skillId } },
    )

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
