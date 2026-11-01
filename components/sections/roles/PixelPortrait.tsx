// Pixel-art portraits in the hero's pixel language. There are no real people here: each is an
// illustrated stand-in for a role, so nothing reads as a real candidate.

/** 12×12 maps. H hair · S skin · E eyes · C clothes · K headset · . empty */
const HEADS = {
  short: [
    "............",
    "...HHHHHH...",
    "..HHHHHHHH..",
    "..HSSSSSSH..",
    "..SSSSSSSS..",
    "..SESSSSES..",
    "..SSSSSSSS..",
    "...SSSSSS...",
    "....SSSS....",
    "..CCCSSCCC..",
    ".CCCCCCCCCC.",
    ".CCCCCCCCCC.",
  ],
  long: [
    "............",
    "...HHHHHH...",
    "..HHHHHHHH..",
    ".HHSSSSSSHH.",
    ".HSSSSSSSSH.",
    ".HSESSSSESH.",
    ".HSSSSSSSSH.",
    ".HHSSSSSSHH.",
    ".HH.SSSS.HH.",
    ".HCCCSSCCCH.",
    ".CCCCCCCCCC.",
    ".CCCCCCCCCC.",
  ],
  bun: [
    ".....HH.....",
    "....HHHH....",
    "..HHHHHHHH..",
    "..HSSSSSSH..",
    "..SSSSSSSS..",
    "..SESSSSES..",
    "..SSSSSSSS..",
    "...SSSSSS...",
    "....SSSS....",
    "..CCCSSCCC..",
    ".CCCCCCCCCC.",
    ".CCCCCCCCCC.",
  ],
  curly: [
    "..H.HH.HH...",
    ".HHHHHHHHHH.",
    ".HHHHHHHHHH.",
    ".HHSSSSSSHH.",
    "..SSSSSSSS..",
    "..SESSSSES..",
    "..SSSSSSSS..",
    "...SSSSSS...",
    "....SSSS....",
    "..CCCSSCCC..",
    ".CCCCCCCCCC.",
    ".CCCCCCCCCC.",
  ],
  side: [
    "............",
    "..HHHHHHH...",
    ".HHHHHHHHH..",
    ".HHHHSSSSH..",
    "..SSSSSSSS..",
    "..SESSSSES..",
    "..SSSSSSSS..",
    "...SSSSSS...",
    "....SSSS....",
    "..CCCSSCCC..",
    ".CCCCCCCCCC.",
    ".CCCCCCCCCC.",
  ],
  headset: [
    "............",
    "...HHHHHH...",
    "..HKKKKKKH..",
    ".KHSSSSSSHK.",
    ".KSSSSSSSSK.",
    ".KSESSSSESK.",
    "..SSSSSSSS..",
    "...SSSSSSK..",
    "....SSSSK...",
    "..CCCSSCCC..",
    ".CCCCCCCCCC.",
    ".CCCCCCCCCC.",
  ],
} satisfies Record<string, string[]>;

export type PortraitSpec = {
  head: keyof typeof HEADS;
  skin: string;
  hair: string;
  clothes: string;
};

export default function PixelPortrait({ head, skin, hair, clothes }: PortraitSpec) {
  const fill: Record<string, string> = { H: hair, S: skin, E: "#0c1210", C: clothes, K: "#0c1210" };
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" shapeRendering="crispEdges" className="size-full">
      {HEADS[head].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={fill[c]} />,
        ),
      )}
    </svg>
  );
}
