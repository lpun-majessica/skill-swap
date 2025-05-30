import dbConnect from "@/lib/dbConnect";
import Connection from "@/models/connection";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const connections = await Connection.find({});

    return NextResponse.json(connections, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
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
    let newConnection = await connection.save();
    newConnection = await Connection.findById(newConnection._id)
      .populate("sender_id", { fullname: 1 })
      .populate("receiver_id", { fullname: 1 });

    return NextResponse.json(newConnection, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function PUT(request) {
  await dbConnect();
  const { sender_id, receiver_id, isAccepted } = await request.json();
  const returnData = { new: true };

  try {
    let updatedConnection = await Connection.findOneAndUpdate(
      { sender_id, receiver_id },
      { isAccepted },
      returnData,
    )
      .populate("sender_id", { fullname: 1 })
      .populate("receiver_id", { fullname: 1 });

    return NextResponse.json(updatedConnection, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(request) {
  await dbConnect();
  const { sender_id, receiver_id } = await request.json();
  const returnData = { new: true };

  try {
    let deletedConnection = await Connection.findOneAndDelete(
      { sender_id, receiver_id },
      returnData,
    )
      .populate("sender_id", { fullname: 1 })
      .populate("receiver_id", { fullname: 1 });

    return NextResponse.json(deletedConnection, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
