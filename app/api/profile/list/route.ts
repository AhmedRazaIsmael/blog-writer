import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profiles =
      await prisma.profile.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}