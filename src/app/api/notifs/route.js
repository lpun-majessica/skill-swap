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
      receiver: userId,
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

    return NextResponse.json(await notification.populate("sender"));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
