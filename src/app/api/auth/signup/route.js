import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    let userData = await request.json();

    if (userData.hasOwnProperty("id")) {
      userData._id = new mongoose.Types.ObjectId(userData.id);
      delete userData.id;
    }

    const user = new User(userData);
    await user.save();

    const response = NextResponse.json(
      { message: "New user created" },
      { status: 201 },
    );
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
