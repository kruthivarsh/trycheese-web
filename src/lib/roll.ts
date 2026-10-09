// Placeholder roll for the marketing site. These are tonal stand-ins, not
// photos: every frame renders with a visible "placeholder" label until real
// trycheese shots replace `scene`.

export type Frame = {
  n: number;
  look: string;
  scene: string;
};

export const roll: Frame[] = [
  {
    n: 1,
    look: "Colour negative",
    scene:
      "radial-gradient(60% 55% at 72% 30%, #ffd9a0 0%, #f4b63f 18%, transparent 55%), radial-gradient(90% 70% at 20% 100%, #5a2a1a 0%, transparent 70%), linear-gradient(180deg, #d9893f 0%, #a6522a 48%, #3b1d14 100%)",
  },
  {
    n: 2,
    look: "Cine print",
    scene:
      "radial-gradient(10% 9% at 30% 40%, #fff3d6 0%, #ff8a4c 40%, transparent 100%), radial-gradient(8% 7% at 64% 34%, #ffe6b0 0%, #e8452c 45%, transparent 100%), radial-gradient(70% 60% at 50% 110%, #1f3b46 0%, transparent 70%), linear-gradient(180deg, #0f1418 0%, #1c2329 60%, #2b2620 100%)",
  },
  {
    n: 3,
    look: "Colour slide",
    scene:
      "radial-gradient(80% 40% at 50% 0%, #8fc7e6 0%, transparent 70%), linear-gradient(180deg, #4f97c4 0%, #9cc9de 46%, #e9d9b4 47%, #d8b97e 70%, #b8894f 100%)",
  },
  {
    n: 4,
    look: "Black & white",
    scene:
      "radial-gradient(45% 50% at 38% 42%, #e9e4dc 0%, #9a948c 40%, transparent 75%), linear-gradient(160deg, #3a3835 0%, #1c1b1a 70%, #0d0d0c 100%)",
  },
  {
    n: 5,
    look: "Instant",
    scene:
      "radial-gradient(70% 60% at 50% 40%, #f6e3c2 0%, #e8b98d 40%, transparent 80%), linear-gradient(180deg, #c98b6b 0%, #9b6a5a 60%, #5c4440 100%)",
  },
  {
    n: 6,
    look: "Colour negative",
    scene:
      "radial-gradient(40% 35% at 70% 65%, #ffe3a8 0%, #f4b63f 30%, transparent 75%), radial-gradient(100% 80% at 0% 0%, #2c4a3a 0%, transparent 70%), linear-gradient(180deg, #37503f 0%, #6b6a3d 55%, #2a2a1c 100%)",
  },
  {
    n: 7,
    look: "Cine print",
    scene:
      "radial-gradient(14% 12% at 52% 46%, #fff5df 0%, #ff9d5c 35%, #e8452c 60%, transparent 100%), radial-gradient(60% 40% at 50% 100%, #3a1410 0%, transparent 80%), linear-gradient(180deg, #160d0b 0%, #2a1611 70%, #120b09 100%)",
  },
  {
    n: 8,
    look: "Colour slide",
    scene:
      "radial-gradient(50% 45% at 30% 30%, #fbe6c8 0%, transparent 70%), linear-gradient(135deg, #e86b4a 0%, #d24b5a 40%, #6a3a7a 100%)",
  },
  {
    n: 9,
    look: "Black & white",
    scene:
      "linear-gradient(180deg, #cfc9bf 0%, #8b857c 38%, #3c3935 39%, #22201e 100%)",
  },
  {
    n: 10,
    look: "Instant",
    scene:
      "radial-gradient(55% 50% at 60% 35%, #fdf0d6 0%, #f2c58f 40%, transparent 80%), linear-gradient(200deg, #7ea7a1 0%, #b9a27b 55%, #6d5847 100%)",
  },
  {
    n: 11,
    look: "Colour negative",
    scene:
      "radial-gradient(35% 30% at 25% 70%, #ffd38a 0%, transparent 75%), radial-gradient(35% 30% at 78% 62%, #ff9b6b 0%, transparent 75%), linear-gradient(180deg, #2b1f2e 0%, #4a2f37 55%, #1a1316 100%)",
  },
  {
    n: 12,
    look: "Cine print",
    scene:
      "radial-gradient(90% 50% at 50% 100%, #f4b63f 0%, #e8452c 35%, transparent 75%), linear-gradient(180deg, #3d2a4a 0%, #8a3f3a 55%, #e0864a 100%)",
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");
