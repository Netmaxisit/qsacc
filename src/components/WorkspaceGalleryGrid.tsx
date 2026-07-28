"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Tile = { file: string; alt: string; className: string; aspect: string };

/** Desktop: [4][5][10] / [6][7][10] / [8----][9----] */
const TILE_META: Omit<Tile, "file">[] = [
  {
    alt: "QuickSolve office workspace",
    className: "lg:col-start-1 lg:row-start-1",
    aspect: "4 / 3",
  },
  {
    alt: "Reception and client seating area",
    className: "lg:col-start-2 lg:row-start-1",
    aspect: "4 / 3",
  },
  {
    alt: "Professional desks and equipment",
    className: "lg:col-start-1 lg:row-start-2",
    aspect: "4 / 3",
  },
  {
    alt: "Meeting and consultation space",
    className: "lg:col-start-2 lg:row-start-2",
    aspect: "4 / 3",
  },
  {
    alt: "QuickSolve Accountancy office interior",
    className: "col-span-2 lg:col-start-1 lg:row-start-3 lg:col-span-2",
    aspect: "16 / 9",
  },
  {
    alt: "Waiting area and team environment",
    className: "col-span-2 lg:col-start-3 lg:row-start-3 lg:col-span-2",
    aspect: "16 / 9",
  },
];

function GalleryImage({
  file,
  alt,
  className,
  aspect,
  index,
  priority,
  fillCell,
}: Tile & { index?: number; priority?: boolean; fillCell?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index ?? 0) * 0.05 }}
      className={`relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm ${fillCell ? "lg:min-h-full" : ""} ${className}`}
      style={fillCell ? { aspectRatio: aspect } : { aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/gallery/${encodeURIComponent(file)}`}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </motion.div>
  );
}

export default function WorkspaceGalleryGrid({
  featuredFile,
  tileFiles,
}: {
  featuredFile: string;
  tileFiles: string[];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const tiles: Tile[] = tileFiles.map((file, i) => ({
    file,
    ...TILE_META[i],
    alt: TILE_META[i]?.alt ?? "QuickSolve Accountants office",
    className: TILE_META[i]?.className ?? "",
    aspect: TILE_META[i]?.aspect ?? "4 / 3",
  }));

  const featured: Tile = {
    file: featuredFile,
    alt: "QuickSolve Accountants team member at the Manchester office",
    className:
      "col-span-2 row-span-2 lg:col-start-3 lg:row-start-1 lg:col-span-2 lg:row-span-2",
    aspect: "3 / 4",
  };

  return (
    <section className="py-24 lg:py-32 bg-white" aria-labelledby="workspace-gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{
              border: "1px solid #CBD5E1",
              color: "#374151",
              background: "transparent",
            }}
          >
            Our Office
          </div>
          <h2
            id="workspace-gallery-heading"
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#1A2B2E" }}
          >
            Our Workspace &amp;{" "}
            <em style={{ color: "#0E5D6B", fontStyle: "italic" }}>Team</em>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Take a look inside our Manchester office — a professional, modern environment
            where our dedicated team works meticulously on your financial success.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-[1fr_1fr_auto] gap-3 sm:gap-4 lg:gap-5 lg:items-stretch">
          {tiles[0] && <GalleryImage {...tiles[0]} index={0} />}
          {tiles[1] && <GalleryImage {...tiles[1]} index={1} />}
          <GalleryImage {...featured} index={2} priority fillCell />
          {tiles[2] && <GalleryImage {...tiles[2]} index={3} />}
          {tiles[3] && <GalleryImage {...tiles[3]} index={4} />}
          {tiles[4] && <GalleryImage {...tiles[4]} index={5} />}
          {tiles[5] && <GalleryImage {...tiles[5]} index={6} />}
        </div>
      </div>
    </section>
  );
}
