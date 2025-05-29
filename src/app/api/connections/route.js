import dbConnect from "@/lib/dbConnect";
import Connection from "@/models/connection";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const connections = await Connection.find({});

    return NextResponse.json(connections);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
