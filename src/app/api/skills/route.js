import dbConnect from "@/lib/db-connect";
import Skill from "@/models/skill";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const skills = await Skill.find({});

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request) {
  await dbConnect();
  const { name } = await request.json();
  const newSkill = new Skill({ name });

  try {
    const savedSkill = await newSkill.save();
    return NextResponse.json(savedSkill);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
