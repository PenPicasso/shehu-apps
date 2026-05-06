import fs from "node:fs";
import path from "node:path";

const required = [
  "index.html",
  "leak-audit/index.html",
  "thank-you/index.html",
  "styles.css",
  "script.js",
  "assets/pipe-hero-960.webp"
];

const missing = required.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
if (missing.length) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  process.exit(1);
}

for (const file of ["index.html", "leak-audit/index.html", "thank-you/index.html"]) {
  const html = fs.readFileSync(path.join(process.cwd(), file), "utf8");
  const events = ["data-event=", "<main", "</main>", "aria-label"];
  for (const token of events) {
    if (!html.includes(token)) {
      console.error(`${file} is missing ${token}`);
      process.exit(1);
    }
  }
}

console.log("Static checks passed.");
