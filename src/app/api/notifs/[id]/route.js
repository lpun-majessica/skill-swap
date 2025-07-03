import dbConnect from "@/lib/db";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const notification = await Notification.findById(id)
      .populate("sender_id")
      .populate("receiver_id");

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
    const updatedNotification = await Notification.findByIdAndUpdate(id, {
      isRead,
    });
    return NextResponse.json(updatedNotification);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
