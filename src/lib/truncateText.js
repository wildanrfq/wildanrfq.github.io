export function truncateText(text, max = 40) {
  if (!text || text.length <= max) return text;
  return text.slice(0, max - 3).trimEnd() + "...";
}
