import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

//     const prompt = `
// Write a blog article for a real business website.

// The article should feel naturally written and easy to read.

// Write like a normal person explaining the topic clearly on a company blog.

// Keep the writing:
// - simple
// - natural
// - readable
// - helpful

// IMPORTANT:
// - Avoid sounding overly polished
// - Avoid perfect paragraph structure
// - Avoid repetitive transitions
// - Avoid sounding like a professional copywriter
// - Avoid over-formatting
// - Avoid turning every section into a list
// - Do not overexplain simple points
// - Keep the flow relaxed and natural

// The article should feel like:
// - a genuine business blog post
// - written manually by a real person
// - meant for actual website visitors

// BLOG TITLE:
// ${body.title}

// WEBSITE:
// ${body.websiteUrl}

// TOPIC:
// ${body.keywords}

// LENGTH:
// 800-1200 words

// RETURN:

// PLAIN_TEXT:
// [plain article]

// HTML_VERSION:
// [clean html only]

// HTML RULES:
// - Return ONLY content HTML
// - No doctype
// - No html/head/body tags
// - No markdown
// - No comments
// - Start directly with content tags

// Use ONLY:
// <h1>
// <h2>
// <h3>
// <p>
// <ul>
// <li>
// <strong>

// The HTML will be pasted into an existing website layout.
// `;

// const prompt = `
// Write a natural blog article for a real business website.

// The article should feel realistic, readable, and naturally written by a human.

// Write in a natural website blog style.

// IMPORTANT:
// - Keep the writing clear and human
// - Keep the tone relaxed and professional
// - Use simple everyday English
// - Prefer simple words over complicated vocabulary
// - Avoid sounding overly polished
// - Avoid sounding like an SEO article
// - Avoid sounding like a copywriter
// - Avoid repetitive transitions
// - Avoid over-formatting
// - Avoid overly structured writing
// - Avoid robotic wording
// - Avoid filler content
// - Avoid corporate tone
// - Avoid dramatic hooks
// - Avoid sounding motivational

// VERY IMPORTANT:
// Avoid difficult or overly polished words like:
// - decode
// - juggling
// - leverage
// - elevate
// - enhance
// - empower

// Use simpler alternatives instead.

// The article should feel:
// - naturally written
// - realistic
// - useful
// - calm and informative
// - written for actual website visitors

// Avoid opening lines like:
// - "X shouldn’t feel like..."
// - "But for many people, it does."
// - overly emotional intros
// - dramatic storytelling hooks

// Start naturally and directly.

// Avoid very short one-line paragraphs unless necessary.
// Most paragraphs should be medium length and flow naturally.

// Use bullet points only occasionally.
// Most of the article should be written in natural flowing paragraphs.

// Avoid numbered sections unless truly necessary.

// Some sections can be shorter than others.
// Not every section needs equal detail.

// Write the article more like a casual business blog post than a structured guide.

// BLOG TITLE:
// ${body.title}

// WEBSITE:
// ${body.websiteUrl}

// MAIN TOPIC:
// ${body.keywords}

// LENGTH:
// 700-1000 words

// ALSO GENERATE:

// META_TITLE:
// - 50-60 characters maximum
// - natural sounding
// - SEO friendly
// - not clickbait

// META_DESCRIPTION:
// - 140-160 characters maximum
// - clear and natural
// - readable by humans first

// META_KEYWORDS:
// - comma separated
// - relevant keywords only

// SLUG:
// - short
// - lowercase
// - hyphen-separated

// RETURN:

// META_TITLE:
// [meta title]

// META_DESCRIPTION:
// [meta description]

// META_KEYWORDS:
// [keywords]

// SLUG:
// [slug]

// PLAIN_TEXT:
// [plain readable article]

// HTML_VERSION:
// [clean html only]

// HTML RULES:
// - Return ONLY content HTML
// - Do NOT generate:
//   <!DOCTYPE html>
//   <html>
//   <head>
//   <body>
//   <meta>
//   <title>

// - No markdown
// - No comments
// - No explanations
// - No placeholder text
// - Start directly with content tags
// - Use clean HTML formatting naturally where needed
// - HTML must be properly closed and production-ready

// The HTML will be pasted into an existing website layout/editor.
// `;

// const prompt = `
// Write a natural blog article for a real business website.

// The article should feel realistic, readable, and naturally written by a human.

// Write in a calm and natural website blog style.

// IMPORTANT:
// - Keep the writing clear and easy to read
// - Use natural everyday English
// - Keep the tone relaxed and professional
// - Prefer simple words over polished vocabulary
// - Avoid sounding like an SEO article
// - Avoid sounding like a copywriter
// - Avoid robotic wording
// - Avoid filler content
// - Avoid dramatic hooks
// - Avoid motivational style writing
// - Avoid overly structured writing
// - Avoid repetitive transitions

// VERY IMPORTANT:
// Use simple language.

// Avoid words like:
// - decode
// - juggling
// - leverage
// - elevate
// - enhance
// - empower
// - optimize
// - maximize

// Use simpler alternatives instead.

// Avoid openings like:
// - "X shouldn’t feel like..."
// - "But for many people, it does."
// - emotional storytelling intros
// - dramatic copywriting hooks

// Let the article flow naturally like a real company blog post.

// Keep the article flowing naturally instead of breaking every idea into separate sections.

// Do not frequently create mini-headings followed by short explanations.

// Use bullet points naturally only when they genuinely improve readability.
// Most of the article should still flow through normal paragraphs.
// Keep most information inside natural paragraphs.

// The article should feel:
// - realistic
// - useful
// - calm
// - naturally written
// - made for real website visitors

// BLOG TITLE:
// ${body.title}

// WEBSITE:
// ${body.websiteUrl}

// MAIN TOPIC:
// ${body.keywords}

// LENGTH:
// 700-1000 words

// ALSO GENERATE:

// META_TITLE:
// - 50-60 characters maximum
// - natural sounding
// - SEO friendly
// - not clickbait

// META_DESCRIPTION:
// - 140-160 characters maximum
// - clear and natural

// META_KEYWORDS:
// - comma separated
// - relevant only

// SLUG:
// - lowercase
// - hyphen-separated

// RETURN:

// META_TITLE:
// [meta title]

// META_DESCRIPTION:
// [meta description]

// META_KEYWORDS:
// [keywords]

// SLUG:
// [slug]

// PLAIN_TEXT:
// [plain readable article]

// HTML_VERSION:
// [clean html only]

// HTML RULES:
// - Return ONLY content HTML
// - Do NOT generate:
//   <!DOCTYPE html>
//   <html>
//   <head>
//   <body>
//   <meta>
//   <title>

// - No markdown
// - No comments
// - No explanations
// - No placeholder text
// - Start directly with content tags
// - HTML must be clean and properly closed

// The HTML will be pasted into an existing website layout/editor.
// `;

// const prompt = `
// Write a natural blog article for a real business website.

// Use clear, simple, natural English.

// Keep the tone relaxed, practical, and professional.

// Write like a normal company blog post written by a real person.

// Avoid sounding overly polished or overly structured.

// Keep the flow natural and conversational.

// Most of the article should flow through normal paragraphs, with only occasional lists if they genuinely help readability.

// BLOG TITLE:
// ${body.title}

// WEBSITE:
// ${body.websiteUrl}

// MAIN TOPIC:
// ${body.keywords}

// LENGTH:
// 700-1000 words

// ALSO GENERATE:

// META_TITLE

// META_DESCRIPTION

// META_KEYWORDS

// SLUG

// RETURN:

// META_TITLE:
// [meta title]

// META_DESCRIPTION:
// [meta description]

// META_KEYWORDS:
// [keywords]

// SLUG:
// [slug]

// PLAIN_TEXT:
// [plain readable article]

// HTML_VERSION:
// [clean html only]

// HTML RULES:
// - No doctype
// - No html/head/body tags
// - No markdown
// - Start directly with content HTML
// `;

// const prompt = `
// Write a blog article for a business website.

// Use simple, clear English.

// Avoid sounding overly polished or overly structured.

// Let the article flow naturally.

// Do not turn every topic into a separate section heading.
// Some ideas should naturally continue inside the same section.

// Most of the article should be written in normal paragraphs.
// Use lists only when they genuinely improve readability.

// BLOG TITLE:
// ${body.title}

// WEBSITE:
// ${body.websiteUrl}

// TOPIC:
// ${body.keywords}

// LENGTH:
// 700-900 words

// Also generate:

// META_TITLE

// META_DESCRIPTION

// META_KEYWORDS

// SLUG

// RETURN:

// META_TITLE:
// [meta title]

// META_DESCRIPTION:
// [meta description]

// META_KEYWORDS:
// [keywords]

// SLUG:
// [slug]

// PLAIN_TEXT:
// [plain article]

// HTML_VERSION:
// [html only]

// HTML RULES:
// - No doctype
// - No html/head/body tags
// - No markdown
// - Start directly with HTML content
// `;

const prompt = `
Write website content for a company blog page.

Use simple, clear English.

Keep the writing natural, readable, and practical.

Avoid sounding overly polished or robotic.

Avoid creating too many small sections or short standalone paragraphs.

Some topics should continue naturally inside the same section instead of creating a new heading every time.

Prefer longer flowing sections over constantly breaking the article into smaller blocks.

Most of the article should flow through normal paragraphs.

Use occasional bullet points where they naturally help readability, but do not overuse them.

Some sections can include short lists, while others should remain paragraph-based.

Include practical information related to the topic naturally.

Avoid repeatedly starting paragraphs with transition phrases like:
"Once you..."
"When you..."
"It helps to..."
"A simple way..."

Some sections can be shorter or longer naturally.
Not every section needs the same amount of detail.

BLOG TITLE:
${body.title}

WEBSITE:
${body.websiteUrl}

TOPIC:
${body.keywords}

LENGTH:
600-1000 words

Also generate:

META_TITLE

META_DESCRIPTION
- Maximum 156 characters
- Clear and readable
- SEO friendly
- Must not exceed 156 characters

META_KEYWORDS

SLUG

FEATURED_IMAGE_PROMPT:
- realistic
- website quality
- modern
- clean
- related to the blog topic
- suitable as a featured image for a business blog

RETURN:

META_TITLE:
[meta title]

META_DESCRIPTION:
[meta description]

META_KEYWORDS:
[keywords]

SLUG:
[slug]

FEATURED_IMAGE_PROMPT:
[image prompt]

PLAIN_TEXT:
[plain content]

HTML_VERSION:
[html only]

HTML RULES:
- No doctype
- No html/head/body tags
- No markdown
- Start directly with HTML content
`;

    const response =
      await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      });

    const content =
    response.choices[0].message.content || "";

    const metaTitle =
    content
        .split("META_TITLE:")[1]
        ?.split("META_DESCRIPTION:")[0]
        ?.trim() || "";

    const metaDescription =
    content
        .split("META_DESCRIPTION:")[1]
        ?.split("META_KEYWORDS:")[0]
        ?.trim() || "";

    const metaKeywords =
    content
        .split("META_KEYWORDS:")[1]
        ?.split("SLUG:")[0]
        ?.trim() || "";

    const slug =
    content
        .split("SLUG:")[1]
        ?.split("FEATURED_IMAGE_PROMPT:")[0]
        ?.trim() || "";

    const plainText =
    content
        .split("PLAIN_TEXT:")[1]
        ?.split("HTML_VERSION:")[0]
        ?.trim() || "";

    const html =
    content
        .split("HTML_VERSION:")[1]
        ?.trim() || ""; 

    const featuredImagePrompt =
    content
        .split("FEATURED_IMAGE_PROMPT:")[1]
        ?.split("PLAIN_TEXT:")[0]
        ?.replace(
        "FEATURED_IMAGE_PROMPT:",
        ""
        )
        ?.trim() || "";

    const imageResponse =
    await openai.images.generate({
        model: "gpt-image-1",
        prompt: featuredImagePrompt,
        size: "1536x1024",
    });

    const imageBase64 =
    imageResponse.data?.[0]?.b64_json;

    if (!imageBase64) {
    throw new Error(
        "Failed to generate featured image"
    );
    }

    const featuredImage =
    `data:image/png;base64,${imageBase64}`;

    await prisma.blog.create({
    data: {
        title: body.title,
        websiteUrl: body.websiteUrl,
        keywords: body.keywords,
        metaTitle,
        metaDescription,
        metaKeywords,
        slug,
        plainText,
        htmlContent: html,
        featuredImage
    },
    });    

    return NextResponse.json({
    metaTitle,
    metaDescription,
    metaKeywords,
    slug,
    plainText,
    html,
    featuredImage,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate blog",
      },
      { status: 500 }
    );
  }
}