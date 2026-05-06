import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "public");

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });

const files = [
  "index.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "vercel.json"
];

const dirs = [
  "assets",
  "leak-audit",
  "thank-you"
];

for (const file of files) {
  await fs.copyFile(path.join(root, file), path.join(out, file));
}

for (const dir of dirs) {
  await fs.cp(path.join(root, dir), path.join(out, dir), { recursive: true });
}

console.log("Prepared static public output.");
