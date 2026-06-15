import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const portfolios =
      await prisma.portfolio.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      portfolios
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch portfolios",
      },
      { status: 500 }
    );
  }
}