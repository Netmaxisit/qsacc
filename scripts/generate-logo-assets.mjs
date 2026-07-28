import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public/qs-logo.png");

async function removeBlackMatte(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 48 && g < 48 && b < 48) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

const meta = await sharp(source).metadata();

// Symbol only: rows 0–74 on the 176px-tall master (row 75+ is QUICKSOLVE text)
const extractHeight = Math.round(meta.height * (75 / 176));

let icon = await sharp(source)
  .extract({ left: 0, top: 0, width: meta.width, height: extractHeight })
  .png()
  .toBuffer();

icon = await removeBlackMatte(icon);

const pad = 18;
icon = await sharp(icon)
  .extend({
    top: pad,
    bottom: pad,
    left: pad,
    right: pad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp(icon).toFile(path.join(root, "public/qs-logo-icon.png"));

// Full logo with transparent background (used by BrandIcon — no crop)
const fullTransparent = await removeBlackMatte(await sharp(source).png().toBuffer());
await sharp(fullTransparent).toFile(
  path.join(root, "public/qs-logo-transparent-full.png"),
);

await sharp(source)
  .flatten({ background: { r: 255, g: 255, b: 255 } })
  .trim({ threshold: 12 })
  .png()
  .toFile(path.join(root, "public/qs-logo-nav.png"));

const out = await sharp(path.join(root, "public/qs-logo-icon.png")).metadata();
console.log(`qs-logo-icon.png → ${out.width}×${out.height}px (extract ${extractHeight}px)`);
