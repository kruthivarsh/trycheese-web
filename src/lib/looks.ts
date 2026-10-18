// The app's looks, mirrored from camera-project lib/data/looks_catalog.dart
// (trycheese-v1). Sample images are the app's own illustrative samples
// (camera-project/assets/images/samples), not photos taken with trycheese:
// every place that shows one labels it "Sample". Swap `src` for real
// trycheese shots once they exist.

export type Look = {
  id: string;
  name: string;
  /** The look's own colour (chips, bars). */
  color: string;
  /** Readable text colour on `color`. */
  ink: string;
  blurb: string;
  grain: number;
  tone: "Faded" | "Soft" | "Natural" | "Rich" | "Punchy" | "Crushed";
  src: string;
  /** CSS object-position that keeps the subject in view when cropped. */
  focus: string;
  mono?: boolean;
};

const DARK = "#0C0C0B";
const CREAM = "#FFF8E1";

export const LOOKS: Look[] = [
  { id: "cheddar", name: "Cheddar", color: "#F4B63F", ink: DARK, blurb: "Warm, golden colour negative", grain: 400, tone: "Natural", src: "/samples/f01.jpg", focus: "50% 40%" },
  { id: "gouda", name: "Gouda", color: "#C8742B", ink: DARK, blurb: "Rich amber, cine print", grain: 400, tone: "Rich", src: "/samples/f12.jpg", focus: "50% 45%" },
  { id: "brie", name: "Brie", color: "#E7B7A4", ink: DARK, blurb: "Soft pastel, low contrast", grain: 200, tone: "Soft", src: "/samples/f08.jpg", focus: "50% 45%" },
  { id: "mozz", name: "Mozz", color: "#BFD9C8", ink: DARK, blurb: "Airy, bright and clean", grain: 100, tone: "Soft", src: "/samples/f10.jpg", focus: "50% 45%" },
  { id: "fresh", name: "Fresh", color: "#4FA3D1", ink: DARK, blurb: "Crisp colour slide", grain: 100, tone: "Punchy", src: "/samples/f03.jpg", focus: "50% 45%" },
  { id: "blue", name: "Blue", color: "#3F63A8", ink: CREAM, blurb: "Cool night, strong halation", grain: 800, tone: "Rich", src: "/samples/f02.jpg", focus: "50% 50%" },
  { id: "aged", name: "Aged", color: "#A88B6A", ink: DARK, blurb: "Faded, expired film", grain: 800, tone: "Faded", src: "/samples/f05.jpg", focus: "50% 45%" },
  { id: "smoked", name: "Smoked", color: "#6E6760", ink: CREAM, blurb: "Hard black and white", grain: 1600, tone: "Crushed", src: "/samples/f04.jpg", focus: "60% 45%", mono: true },
  { id: "swiss", name: "Swiss", color: "#C9C3BA", ink: DARK, blurb: "Soft black and white", grain: 400, tone: "Soft", src: "/samples/f09.jpg", focus: "50% 45%", mono: true },
  { id: "surprise", name: "Surprise", color: "#E8452C", ink: DARK, blurb: "A different look for every shot", grain: 400, tone: "Natural", src: "/samples/f11.jpg", focus: "50% 45%" },
];

export const look = (id: string): Look => {
  const l = LOOKS.find((x) => x.id === id);
  if (!l) throw new Error(`Unknown look: ${id}`);
  return l;
};

export const pad = (n: number) => String(n).padStart(2, "0");

/** Film-edge code printed beside a frame, e.g. "trycheese ▸ 400 ▸ 07A". */
export const edgeCode = (n: number, grain = 400) => `trycheese ▸ ${grain} ▸ ${pad(n)}A`;
