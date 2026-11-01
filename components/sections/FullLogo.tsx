import Image from "next/image";

/**
 * The full VibeLevel logo (star + wordmark) from the brand raster, cropped to its artwork so it
 * can be sized by width. Same file the navbar uses.
 */
export default function FullLogo({ className = "w-[180px]" }: { className?: string }) {
  return (
    <span className={`relative block aspect-[6.5] overflow-hidden ${className}`}>
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={2167}
        height={725}
        sizes="240px"
        className="absolute left-[-7.5%] top-[-67%] h-auto w-[115%] max-w-none"
      />
    </span>
  );
}
