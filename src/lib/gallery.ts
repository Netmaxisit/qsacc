import galleryManifest from "@/data/gallery-files.json";

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

/** Gallery list is build-time data (see `scripts/sync-gallery-manifest.sh`). */
export function getGalleryFilenames(): string[] {
  return galleryManifest
    .filter((name) => IMAGE_EXT.test(name) && !name.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function pickGalleryLayout(filenames: string[]) {
  const featuredName =
    filenames.find((f) => /^10\.(jpe?g|png|webp)$/i.test(f)) ??
    filenames.find((f) => /^owner\.(jpe?g|png|webp)$/i.test(f)) ??
    filenames[0];

  const others = filenames.filter((f) => f !== featuredName);
  const preferredOrder = ["4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
  const ordered = [
    ...preferredOrder.filter((f) => others.includes(f)),
    ...others.filter((f) => !preferredOrder.includes(f)),
  ];
  const tiles = ordered.slice(0, 6);

  return { featuredName, tiles };
}
