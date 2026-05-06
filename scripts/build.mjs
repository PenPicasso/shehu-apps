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
    name: "pipe-hero",
    widths: [640, 960, 1120],
    crop: { left: 124, top: 208, width: 880, height: 118 }
  }
];

for (const asset of assets) {
  const input = path.join(sourceDir, asset.source);
  for (const width of asset.widths) {
    let pipeline = sharp(input).rotate();
    if (asset.crop) pipeline = pipeline.extract(asset.crop);
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
    await pipeline.webp({ quality: asset.name === "pipe-hero" ? 84 : 78 }).toFile(path.join(outDir, `${asset.name}-${width}.webp`));
  }
}

console.log("Built optimized Ovrin assets.");
