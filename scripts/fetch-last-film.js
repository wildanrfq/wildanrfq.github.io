import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RSS_URL = "https://letterboxd.com/wildanrfq/rss/";
const OUT_PATH = resolve(__dirname, "../public/last-film.json");

function readExisting() {
  if (!existsSync(OUT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(OUT_PATH, "utf-8"));
  } catch {
    return null;
  }
}

function sameFilm(a, b) {
  if (!a || !b) return false;
  return a.url === b.url && a.rating === b.rating;
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].trim() : null;
}

function stripCdata(str) {
  if (!str) return str;
  const match = str.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return match ? match[1] : str;
}

function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

async function fetchLastFilm() {
  const res = await fetch(RSS_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)" },
  });

  if (!res.ok) {
    throw new Error(`RSS fetch failed with status ${res.status}`);
  }

  const xml = await res.text();
  const firstItem = xml.match(/<item>([\s\S]*?)<\/item>/);

  if (!firstItem) {
    throw new Error("no item found in RSS feed");
  }

  const block = firstItem[1];

  const link = stripCdata(extractTag(block, "link"));
  const filmTitle = decodeEntities(
    stripCdata(extractTag(block, "letterboxd:filmTitle"))
  );
  const ratingRaw = extractTag(block, "letterboxd:memberRating");
  const rating = ratingRaw ? Number(ratingRaw) : null;

  const description = stripCdata(extractTag(block, "description"));
  const posterMatch = description?.match(/<img src="([^"]+)"/);
  const poster = posterMatch ? posterMatch[1] : null;

  return {
    title: filmTitle,
    poster,
    rating,
    url: link,
    fetchedAt: new Date().toISOString(),
  };
}

async function run() {
  let film = null;

  try {
    film = await fetchLastFilm();
  } catch (err) {
    console.log("fetch failed:", err.message);
    console.log("keeping previous last-film.json untouched");
    return;
  }

  const existing = readExisting();
  if (sameFilm(existing, film)) {
    console.log("last film unchanged, leaving last-film.json untouched");
    return;
  }

  writeFileSync(OUT_PATH, JSON.stringify(film, null, 2));
  console.log("written:", film);
}

run();