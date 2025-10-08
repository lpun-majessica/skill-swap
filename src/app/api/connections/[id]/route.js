import { dbConnect } from "@/lib/db";
import Connection from "@/models/connection";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();
  const returnData = { new: true };

  try {
    const { isAccepted } = await request.json();
    const { id } = await params;

    let updatedConnection = await Connection.findByIdAndUpdate(
      id,
      { isAccepted },
      returnData,
    )
      .populate("sender_id", { fullname: 1 })
      .populate("receiver_id", { fullname: 1 });

    return NextResponse.json(updatedConnection, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
