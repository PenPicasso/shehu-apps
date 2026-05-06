import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "assets");
const sourceDir = path.join("C:", "Users", "ShehuRingim", "Downloads");

await fs.mkdir(outDir, { recursive: true });

const assets = [
  {
    source: "Orvin- Final lander.png",
    name: "hero-static",
    widths: [640, 960, 1120],
    crop: { left: 120, top: 214, width: 895, height: 326 }
  },
  {
    source: "ovrin.jpeg",
    name: "logo-mark",
    widths: [72, 120],
    crop: { left: 542, top: 46, width: 174, height: 174 }
  }
];

for (const asset of assets) {
  const input = path.join(sourceDir, asset.source);
  for (const width of asset.widths) {
    let pipeline = sharp(input).rotate();
    if (asset.crop) pipeline = pipeline.extract(asset.crop);
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
    await pipeline.webp({ quality: asset.name === "hero-static" ? 88 : 90 }).toFile(path.join(outDir, `${asset.name}-${width}.webp`));
  }
}

console.log("Built optimized Ovrin assets.");
