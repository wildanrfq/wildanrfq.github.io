import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROFILE_URL = "https://letterboxd.com/wildanrfq";

async function scrapeOnce(browser) {
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 1600 },
    locale: "en-US",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const page = await context.newPage();

  await page.goto(PROFILE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });

  const posterLocator = page
    .locator("#recent-activity .film-poster, section.js-poster-list .film-poster")
    .first();

  await posterLocator.waitFor({ timeout: 20000 });
  await posterLocator.scrollIntoViewIfNeeded();

  await page
    .waitForFunction(() => {
      const img = document.querySelector(
        "#recent-activity .film-poster img, section.js-poster-list .film-poster img"
      );
      return img && img.src && !img.src.includes("empty-poster");
    }, { timeout: 20000 })
    .catch(() => {});

  const film = await page.evaluate(() => {
    const firstItem =
      document.querySelector("#recent-activity .film-poster") ||
      document.querySelector("section.js-poster-list .film-poster");

    if (!firstItem) return null;

    const rawTitle =
      firstItem.getAttribute("data-film-name") ||
      firstItem.querySelector("img")?.getAttribute("alt");
    const title = rawTitle?.startsWith("Poster for ")
      ? rawTitle.replace("Poster for ", "")
      : rawTitle;

    const imgEl = firstItem.querySelector("img");
    let poster = imgEl?.getAttribute("src") || null;
    if (poster && poster.includes("empty-poster")) poster = null;

    const container = firstItem.closest("li");
    const ratingEl = container?.querySelector("[class*='rated-']");
    const match = ratingEl?.className?.match(/rated-(\d+)/);
    const rating = match ? Number(match[1]) / 2 : null;

    const linkEl = firstItem.closest("a") || firstItem.querySelector("a");
    const slug = linkEl?.getAttribute("href") || firstItem.getAttribute("data-film-slug");
    const url = slug ? `https://letterboxd.com${slug.startsWith("/") ? slug : "/" + slug}` : null;

    return { title, poster, rating, url, fetchedAt: new Date().toISOString() };
  });

  await context.close();
  return film;
}

async function fetchLastFilm() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--disable-dev-shm-usage",
    ],
  });

  let film = null;
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      film = await scrapeOnce(browser);
      if (film) break;
    } catch (err) {
      lastError = err;
      console.log(`attempt ${attempt} failed: ${err.message}`);
      await new Promise((r) => setTimeout(r, 3000 * attempt));
    }
  }

  await browser.close();

  if (!film) {
    console.log("all attempts failed, keeping previous last-film.json untouched");
    if (lastError) console.log(lastError.message);
    return;
  }

  const outPath = resolve(__dirname, "../public/last-film.json");
  writeFileSync(outPath, JSON.stringify(film, null, 2));
  console.log("written:", film);
}

fetchLastFilm();
