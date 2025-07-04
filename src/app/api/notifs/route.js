import dbConnect from "@/lib/db";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      throw new Error("userId not provided");
    }

    const notifications = await Notification.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender");

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const notificationData = await request.json();

    const notification = new Notification(notificationData);
    await notification.save();

    return NextResponse.json(notification.populate("sender"));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(request) {
  await dbConnect();

  try {
    const filter = await request.json();

    await Notification.findOneAndDelete(filter);
    return NextResponse.json({
      success: true,
      message: "This notif is deleted",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
