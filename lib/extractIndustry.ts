export function extractIndustry(
  text: string
) {
  const lower =
    text.toLowerCase();

  if (
    lower.includes("landscaping")
  ) {
    return "landscaping";
  }

  if (
    lower.includes("transport") ||
    lower.includes("logistics") ||
    lower.includes("trucking")
  ) {
    return "transport";
  }

  if (
    lower.includes("roofing")
  ) {
    return "roofing";
  }

  if (
    lower.includes("law")
  ) {
    return "law firm";
  }

  if (
    lower.includes("medical") ||
    lower.includes("clinic")
  ) {
    return "medical";
  }

  if (
    lower.includes("restaurant")
  ) {
    return "restaurant";
  }

  return "business";
}