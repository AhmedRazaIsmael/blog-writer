// export function matchPortfolio(
//   jobText: string,
//   portfolios: any[]
// ) {
//   return portfolios.sort((a, b) => {
//     const aScore = a.keywords
//       .toLowerCase()
//       .split(",")
//       .filter((keyword: string) =>
//         jobText.toLowerCase().includes(
//           keyword.trim()
//         )
//       ).length;

//     const bScore = b.keywords
//       .toLowerCase()
//       .split(",")
//       .filter((keyword: string) =>
//         jobText.toLowerCase().includes(
//           keyword.trim()
//         )
//       ).length;

//     return bScore - aScore;
//   });
// }

export function matchPortfolio(
  jobText: string,
  portfolios: any[]
) {
  const lowerJob =
    jobText.toLowerCase();

  return portfolios
    .map((portfolio) => {
      const searchable =
        `
        ${portfolio.title}
        ${portfolio.description}
        ${portfolio.keywords}
      `.toLowerCase();

      let score = 0;

      const words =
        lowerJob.split(/\s+/);

      words.forEach((word) => {
        if (
          searchable.includes(word)
        ) {
          score++;
        }
      });

      return {
        ...portfolio,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);
}