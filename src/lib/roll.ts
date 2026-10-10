// Sample frames for the marketing site. The images in /public/frames are
// procedural PLACEHOLDERS (grain + bloom + halation rendered by
// scripts/generate-placeholder-frames.mjs), not photographs. Every frame shows
// a visible "Placeholder" label until real trycheese shots replace `src`.

export type Frame = {
  n: number;
  look: string;
  src: string;
  /** CSS object-position keeping the frame's light source in view when cropped. */
  focus: string;
};

// Main light source of each placeholder scene (x%, y%).
const focus = ["72% 40%", "50% 44%", "50% 50%", "37% 43%", "50% 42%", "68% 32%", "52% 46%", "53% 58%", "50% 50%", "62% 34%", "50% 62%", "46% 66%"];

const looks = [
  "Colour negative",
  "Cine print",
  "Colour slide",
  "Black & white",
  "Instant",
  "Colour negative",
  "Cine print",
  "Colour slide",
  "Black & white",
  "Instant",
  "Colour negative",
  "Cine print",
];

export const pad = (n: number) => String(n).padStart(2, "0");

export const roll: Frame[] = looks.map((look, i) => ({
  n: i + 1,
  look,
  src: `/frames/frame-${pad(i + 1)}.jpg`,
  focus: focus[i],
}));

/** Film-edge code printed beside a frame, e.g. "trycheese ▸ 400 ▸ 07A". */
export const edgeCode = (n: number) => `trycheese ▸ 400 ▸ ${pad(n)}A`;
