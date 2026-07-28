/** Official QS mark — full `public/qs-icon.png`, no cropping */
export default function BrandIcon({ size = 48 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/qs-icon.png"
      alt=""
      width={500}
      height={500}
      draggable={false}
      className="block shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}
