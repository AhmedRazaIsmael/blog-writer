export async function searchIndustryWebsites(
  query: string
) {
  try {
    console.log("SEARCH QUERY:", query);

    const response = await fetch(
      "https://google.serper.dev/search",
      {
        method: "POST",
        headers: {
          "X-API-KEY":
            process.env.SERPER_API_KEY!,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          q: query,
        }),
      }
    );

    const data = await response.json();

    console.log("SERPER RESPONSE:", data);

    return data.organic || [];
  } catch (error) {
    console.log(
      "SERPER ERROR:",
      error
    );

    return [];
  }
}