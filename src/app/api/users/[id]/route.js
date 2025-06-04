import dbConnect from "@/lib/db-connect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import hashPassword from "@/utils/hash-password";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const user = await User.findById(id)
      .populate("skillsToTeach")
      .populate("skillsToLearn");

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  let updatedFields = await request.json();
  const returnData = { new: true };

  if (updatedFields.hasOwnProperty("password")) {
    updatedFields = await hashPassword(updatedFields, NextResponse);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedFields,
      returnData,
    )
      .populate("skillsToTeach")
      .populate("skillsToLearn");

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
