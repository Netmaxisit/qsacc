/** QuickSolve wordmark — QUICK (gold) + SOLVE (teal) + ACCOUNTANTS */
export default function BrandWordmark({
  className = "",
  size = "md",
  theme = "light",
}: {
  className?: string;
  size?: "sm" | "md";
  theme?: "light" | "dark";
}) {
  const title = size === "sm" ? "text-base sm:text-lg" : "text-lg sm:text-xl";
  const sub =
    size === "sm"
      ? "text-[9px] sm:text-[10px] tracking-[0.26em] sm:tracking-[0.3em]"
      : "text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.32em]";

  const accent = theme === "dark" ? "#B8DCE3" : "#0E5D6B";

  return (
    <div
      className={`shrink-0 ${className}`}
      style={{ fontFamily: "var(--font-lexend), system-ui, sans-serif" }}
    >
      <div className={`${title} leading-none uppercase`}>
        <span className="font-extrabold" style={{ color: "#D3B267" }}>
          QUICK
        </span>
        <span className="font-bold" style={{ color: accent }}>
          SOLVE
        </span>
      </div>
      <p
        className={`${sub} mt-1.5 text-center font-bold uppercase leading-none`}
        style={{ color: accent }}
      >
        ACCOUNTANTS
      </p>
    </div>
  );
}
