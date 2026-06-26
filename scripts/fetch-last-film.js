import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fetchLastFilm() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  // Menggunakan 'networkidle' memastikan aset gambar sudah ter-fetch
  await page.goto("https://letterboxd.com/wildanrfq", {
    waitUntil: "domcontentloaded", 
    timeout: 30000,
  });

  await page
    .waitForSelector(".film-poster", { timeout: 15000 })
    .catch(() => page.waitForTimeout(5000));

  const film = await page.evaluate(() => {
    const activitySection =
      document.querySelector("section#recent-activity") ||
      document.querySelector("[data-obj-ect-name='activity']");

    const firstItem =
      activitySection?.querySelector(".film-poster") ||
      document.querySelector("section.js-poster-list .film-poster");

    if (!firstItem) return null;

    const rawTitle =
      firstItem.getAttribute("data-film-name") ||
      firstItem.querySelector("img")?.getAttribute("alt");

    const title = rawTitle?.includes("Poster for")
      ? rawTitle.replace("Poster for ", "")
      : rawTitle;

    // PERBAIKAN DI SINI: Mengutamakan data-src / data-cache-busting-src milik Letterboxd
    const imgEl = firstItem.querySelector("img");
    const poster =
      imgEl?.getAttribute("data-cache-busting-src") ||
      imgEl?.getAttribute("data-src") ||
      imgEl?.getAttribute("src");

    const ratingEl = firstItem
      .closest(".poster-container, li")
      ?.querySelector(".rating, [class*='rated-']");

    const match = ratingEl?.className?.match(/rated-(\d+)/);
    const rating = match ? Number(match[1]) / 2 : null;

    const linkEl = firstItem.closest("a") || firstItem.querySelector("a");
    const slug = linkEl?.getAttribute("href");
    const url = slug ? `https://letterboxd.com${slug}` : null;

    return { title, poster, rating, url, fetchedAt: new Date().toISOString() };
  });

  await browser.close();

  const outPath = resolve(__dirname, "../public/last-film.json");
  writeFileSync(outPath, JSON.stringify(film ?? {}, null, 2));
  console.log("written:", film);
}

fetchLastFilm();