import { chromium } from "playwright";

const base = "http://localhost:3001";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text().slice(0, 120));
});
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

// Visit order simulates: land directly on a project page (preloader runs once),
// then navigate to the others (preloader skipped).
const pages = [
  ["senza-limiti", "/projects/senza-limiti"],
  ["ear-cuff", "/projects/ear-cuff"],
  ["anatomia", "/projects/anatomia-della-gabbia"],
  ["home", "/"],
];

for (const [name, path] of pages) {
  errors.length = 0;
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600); // preloader (~2s) + first reveals
  await page.screenshot({ path: `scripts/${name}.png` });
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.15));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `scripts/${name}-scroll.png` });
  console.log(`=== ${name} (${path}) === ${errors.length ? errors.join(" | ") : "clean"}`);
}

await browser.close();
