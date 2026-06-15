import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const imagePromptResponse =
      await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          {
            role: "user",
            content: `
Create a featured image prompt for a blog.

Blog Title:
${body.title}

Blog Content:
${body.content}

Requirements:
- realistic
- modern
- clean
- website quality
- professional
- suitable as a blog featured image
- landscape orientation

Return only the image prompt.
`,
          },
        ],
      });

    const imagePrompt =
      imagePromptResponse
        .choices[0]
        .message.content || "";

    const imageResponse =
      await openai.images.generate({
        model: "gpt-image-1",
        prompt: imagePrompt,
        size: "1536x1024",
      });

    const imageBase64 =
      imageResponse.data?.[0]
        ?.b64_json;

    if (!imageBase64) {
      throw new Error(
        "Image generation failed"
      );
    }

    const featuredImage =
      `data:image/png;base64,${imageBase64}`;

      await prisma.blogImage.create({
        data: {
            title: body.title,
            content: body.content,
            image: featuredImage,
        },
        });
    return NextResponse.json({
      featuredImage,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate image",
      },
      { status: 500 }
    );
  }
}