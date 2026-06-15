import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const portfolio =
      await prisma.portfolio.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          description:
            body.description,
          keywords: body.keywords,
          url: body.url,
        },
      });

    return NextResponse.json(
      portfolio
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to update portfolio",
      },
      { status: 500 }
    );
  }
}