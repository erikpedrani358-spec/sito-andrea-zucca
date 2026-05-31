import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3003/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "scripts/hero.png" });
await browser.close();
console.log("done");
