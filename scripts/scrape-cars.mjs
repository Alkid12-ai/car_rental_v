/**
 * Scrapes the live rentcardb.com car listing and prints structured JSON.
 *
 *   node scripts/scrape-cars.mjs
 *
 * Caches the listing HTML in the OS temp dir so repeat runs are instant.
 * Delete that file (or pass --fresh) to re-download.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const LISTING_URL = "https://www.rentcardb.com/sq/cars";
const CACHE = path.join(os.tmpdir(), "rentcardb", "cars-listing.html");
const fresh = process.argv.includes("--fresh");

const CATEGORIES = ["Ekonomike", "Familjare", "SUV", "Premium", "Sportive"];
const FUELS = ["Benzinë", "Naftë", "Benzine & Gaz"];

async function loadHtml() {
  if (!fresh && fs.existsSync(CACHE)) return fs.readFileSync(CACHE, "utf8");
  const res = await fetch(LISTING_URL, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; rentcardb-import/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${LISTING_URL}`);
  const html = await res.text();
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, html, "utf8");
  return html;
}

const decode = (value) =>
  value
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;|\u00a0/g, " ")
    .replace(/&euro;/g, "€");

const toText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

const html = await loadHtml();

/* --- locate one DOM block per car, in page order ------------------------- */

const firstIndex = new Map();
const linkRe = /href="\/sq\/cars\/([a-z0-9-]+)"/g;
for (const match of html.matchAll(linkRe)) {
  if (!firstIndex.has(match[1])) firstIndex.set(match[1], match.index);
}

const ordered = [...firstIndex.entries()].sort((a, b) => a[1] - b[1]);

const cars = ordered.map(([slug, start], index) => {
  const nextStart = ordered[index + 1]?.[1] ?? html.length;
  const block = html.slice(start, Math.min(nextStart, start + 30_000));
  const text = toText(block);

  const alt = decode(block.match(/<img alt="([^"]*)"/)?.[1] ?? "");
  // Some entries (e.g. minibuses) omit the year from the alt text and only
  // carry it in the slug suffix, so fall back to that.
  const yearMatch =
    alt.match(/(19|20)\d{2}/) ?? slug.match(/-((?:19|20)\d{2})$/);
  const year = yearMatch ? Number(yearMatch[0]) : null;
  const name = year ? alt.replace(String(year), "").trim() : alt.trim();

  // Cloudinary source, recovered from the /_next/image proxy URL
  const raw = block.match(/url=(https%3A%2F%2Fres\.cloudinary\.com[^&"]+)/)?.[1];
  const image = raw ? decodeURIComponent(raw) : null;

  const priceMatch = text.match(/€\s*(\d+)/) ?? text.match(/(\d+)\s*€/);
  const seatsMatch = text.match(/(\d+)\s*\+?\s*vende/i);
  const minDaysMatch = text.match(/Min\.?\s*(\d+)/i);

  return {
    slug,
    name,
    year,
    category: CATEGORIES.find((c) => text.includes(c)) ?? null,
    transmission: text.includes("Automatik")
      ? "Automatik"
      : text.includes("Manual")
        ? "Manual"
        : null,
    seats: seatsMatch ? Number(seatsMatch[1]) : null,
    fuel: FUELS.find((f) => text.includes(f)) ?? null,
    pricePerDay: priceMatch ? Number(priceMatch[1]) : null,
    minDays: minDaysMatch ? Number(minDaysMatch[1]) : null,
    image,
    _text: text.slice(0, 160),
  };
});

/* --- write output -------------------------------------------------------- */

const OUT = path.join(process.cwd(), "src", "data", "cars.generated.json");

const payload = {
  source: LISTING_URL,
  scrapedAt: new Date().toISOString(),
  cars: cars.map(({ _text, ...car }) => car),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

const incomplete = payload.cars.filter(
  (car) =>
    !car.name || !car.year || !car.transmission || !car.seats || !car.pricePerDay || !car.image
);

console.log(
  `scraped ${payload.cars.length} cars -> ${path.relative(process.cwd(), OUT)}`
);

if (incomplete.length) {
  console.log(`\n${incomplete.length} entry(ies) missing core fields:`);
  for (const car of incomplete) console.log(`  - ${car.slug}`);
}

const noCategory = payload.cars.filter((car) => !car.category).map((car) => car.slug);
if (noCategory.length) {
  console.log(`\nno category on source site (map manually): ${noCategory.join(", ")}`);
}

const prices = payload.cars.map((car) => car.pricePerDay).filter(Boolean);
console.log(`price range: €${Math.min(...prices)} – €${Math.max(...prices)} / day`);

