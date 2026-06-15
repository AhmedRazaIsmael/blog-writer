import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const profile = await prisma.profile.create({
      data: {
        name: body.name,
        title: body.title,
        bio: body.bio,
        skills: body.skills,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}