import { dbConnect } from "@/lib/db";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const notification = await Notification.findById(id).populate("sender");

    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const isRead = true;

  try {
    await Notification.findByIdAndUpdate(id, { isRead });
    const updatedNotification = await Notification.findById(id)
    return NextResponse.json(updatedNotification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const returnData = { new: false };

  try {
    const { id } = await params;

    await Notification.findByIdAndDelete(id, returnData);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
