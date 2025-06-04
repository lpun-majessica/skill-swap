import dbConnect from "@/lib/db-connect";
import Connection from "@/models/connection";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const searchParams = request.nextUrl.searchParams;
  const currentUserId = searchParams.get("currentUserId");
  const userId = searchParams.get("userId");

  try {
    const connection = await Connection.find({
      $or: [
        { sender_id: currentUserId, receiver_id: userId },
        { sender_id: userId, receiver_id: currentUserId },
      ],
    });
    return NextResponse.json(connection, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
