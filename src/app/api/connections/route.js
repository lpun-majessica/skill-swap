import { dbConnect } from "@/lib/db";
import Connection from "@/models/connection";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      throw new Error("no userId");
    }

    const connections = await Connection.find({
      $or: [{ sender_id: userId }, { receiver_id: userId }],
    });

    return NextResponse.json(connections, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();
  const { sender_id, receiver_id, isAccepted } = await request.json();

  const connection = new Connection({
    sender_id,
    receiver_id,
    isAccepted: isAccepted ?? false,
  });

  try {
    await connection.save();
    return NextResponse.json(connection, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(request) {
  await dbConnect();
  const { connectionId } = await request.json();
  const returnData = { new: true };

  try {
    let deletedConnection = await Connection.findByIdAndDelete(
      connectionId,
      returnData,
    )
      .populate("sender_id", { fullname: 1 })
      .populate("receiver_id", { fullname: 1 });

    return NextResponse.json(deletedConnection, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
