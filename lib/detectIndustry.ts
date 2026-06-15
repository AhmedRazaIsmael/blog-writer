import { openai } from "@/lib/openai";

export async function detectIndustry(
  jobPost: string
) {
  try {
    const response =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              `
Extract the business industry from the job post.

Rules:
- Return ONLY the industry name
- Keep it short
- Examples:
  landscaping
  roofing
  transport
  restaurant
  law firm
  medical clinic
  plumbing
  HVAC
  cleaning company
  SaaS
  ecommerce
              `,
          },
          {
            role: "user",
            content: jobPost,
          },
        ],
        temperature: 0,
      });

    return (
      response.choices[0].message.content ||
      "business"
    );
  } catch (error) {
    console.log(error);

    return "business";
  }
}