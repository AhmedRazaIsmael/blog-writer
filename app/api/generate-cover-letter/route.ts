import { prisma } from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { matchPortfolio } from "@/lib/portfolioMatcher";
import { NextResponse } from "next/server";
import { searchIndustryWebsites } from "@/lib/serper";
import { extractIndustry } from "@/lib/extractIndustry";
import { detectIndustry } from "@/lib/detectIndustry";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jobPost = body.jobPost;

    const profile = await prisma.profile.findUnique({
      where: {
        id: body.profileId,
      },
    });

    const portfolios =
      await prisma.portfolio.findMany();

    const matchedPortfolios =
      matchPortfolio(jobPost, portfolios);

    const topPortfolios =
    matchedPortfolios.slice(0, 8);

      const industry =
      await detectIndustry(jobPost);

    const searchQuery =
      `${industry} company websites in usa`;

      const industryWebsites =
      await searchIndustryWebsites(
        searchQuery
      );

      console.log(industryWebsites);

      const topWebsites =
      industryWebsites
        .slice(0, 3)
        .map(
          (site: any) =>
            `- ${site.title} (${site.link})`
        )
        .join("\n");

        const serperLinks =
      industryWebsites
        .slice(0, 7)
        .map((site: any) => site.link);

        const portfolioLinks = [
        ...topPortfolios.map(
          (portfolio: any) => portfolio.url
        ),
        ...serperLinks,
      ].join("\n");

        const prompt = `
      Write a realistic Upwork cover letter.

      The proposal should sound like a real freelancer wrote it manually after reading the job post carefully.

      STYLE:

      * natural
      * professional
      * concise
      * direct
      * simple English
      * slightly conversational

      OPENING RULES:

      * Start directly and naturally
      * Avoid openings like:

        * "You're looking for..."
        * "I see you need..."
        * "From your post..."
        * "It sounds like..."
        * "You need..."
      * The opening should feel like a natural freelancer introduction, not a summary of the job post
      * Prefer openings similar to:

        * "Hi Fernando, I can help you build..."
        * "Hi Fernando, I’d be glad to help with..."
        * "Hi Fernando, I can build..."
      
      IMPORTANT:

      * Start with "Hi" or "Hi [Client Name]"
      * The first 2 lines should clearly mention the client's project
      * Keep the proposal easy to read
      * Avoid sounding like AI
      * Avoid sounding like a consultant
      * Avoid long explanations
      * Avoid overanalyzing the project
      * Avoid fake excitement
      * Avoid buzzwords
      * Avoid marketing language
      * 140–220 words

      STRUCTURE:

      * Short opening
      * Short introduction
      * Simple explanation of approach
      * Short portfolio section
      * One natural question
      * Short closing sentence
      * End with:
        Best regards,
        OR
        Let's connect,
        followed by freelancer first name

      PORTFOLIO RULES:

      * Add a section:
        "Here's my portfolio:"
      * List the provided portfolio URLs
      * Do not explain portfolio projects too much

      IMPORTANT ENDING RULE:
      Before the final sign-off ("Best regards" or "Let's connect"), ALWAYS include ONE short natural closing sentence.

      Examples:

      * "Let me know your thoughts, and I’ll be glad to share ideas tailored to your project."
      * "I’d be glad to discuss your project further — when’s a good time to connect?"
      * "Happy to discuss the details further and see what direction you'd like to go with the site."
      * "Feel free to share any examples or ideas you already have in mind."

      The closing sentence should:

      * sound natural
      * encourage a reply
      * feel conversational
      * be short (1 sentence only)
      * come AFTER the question
      * come BEFORE the final sign-off

      PROFILE:
      Name: ${profile?.name}
      Title: ${profile?.title}
      Bio: ${profile?.bio}
      Skills: ${profile?.skills}

      PORTFOLIO LINKS:
      ${portfolioLinks}

      JOB POST:
      ${jobPost}

      Write the proposal now.
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
        temperature: 0.75,
        frequency_penalty: 0.4,
        presence_penalty: 0.2,
      });

    const proposal =
      response.choices[0].message.content;

    await prisma.proposal.create({
      data: {
        jobPost,
        proposal: proposal || "",
      },
    });

    return NextResponse.json({
      proposal,
      websites: industryWebsites
        .slice(0, 3)
        .map((site: any) => site.link),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate proposal",
      },
      { status: 500 }
    );
  }
}