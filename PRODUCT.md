# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + Tailwind CSS v4, pnpm, TypeScript, chosen by the user (2026-10-09). Lives in `~/Pictures/Trycheese`. No backend of its own, except one server action that forwards account deletion requests to the trycheese API.

## Users

People who want phone photos that look like film without editing: film nostalgics, Gen Z casual shooters, hobbyist creators, and memory keepers (source: `camera-project/brand/context.md`). On this site they are first-time visitors deciding whether trycheese is worth downloading when it launches.

## Product Purpose

trycheese is a film camera app for iOS and Android, in the class of mood.camera and Lampa: hand-tuned film looks (grain, halation, filmic tone) are baked in at capture, there is no live filter preview (so people stay in the moment; the effects can't render accurately in real time), and photos cannot be imported: it is a camera, not an editor. After each shot the processed photo is revealed a beat later. (Concept confirmed by the user 2026-10-09; there are no 12-frame rolls and no multi-hour develop wait.) The marketing site's job pre-launch: make the film look and the two-platform availability believable, and point visitors at the coming-soon store badges.

## Positioning

The premium film camera with a grin, on both platforms: mood.camera and Lampa are iPhone-only; trycheese ships on iPhone **and** Android, free at launch.

## Operating Context

Visitors arrive on phones and desktops, mostly from social posts and store-adjacent links. v1 of the app is free: no subscription, no in-app purchases, no ads. The first 5 photos work signed out; after that, and for Community, it needs a free account (email code, Sign in with Apple, Google), served by the trycheese_be API. This website has no backend of its own, except one server action (/delete-account) that forwards account deletion requests to that API.

## Capabilities and Constraints

- App status: pre-launch. Store links do not exist yet → badges are shown as "coming soon".
- No email capture or sign-up; the only form is /delete-account, which calls the API server to server.
- Privacy policy (/privacy) and support (/support) describe what the app and API actually do; update them with any change to data handling. /terms and /community-guidelines describe the app's real rules.
- Photos: no real trycheese shots exist yet. Sample images are labelled "Sample" until real shots replace them.
- Planned app capabilities (from the PRD, not yet shipped): own film looks, grain, halation, no live filter preview, no importing, EV / lenses / aspect ratios, portrait mode, double exposure, preset recipes shared by code/QR. Describe these as what the app does, never with invented numbers (the ten looks shown come from the app's own catalog; no blend-mode or other invented counts).

## Brand Commitments

- Name: `trycheese`, always lowercase. Logo: the **Bubbly Cheese** icon (`public/brand`, from `design/brand-kit`) and the wordmark in **Bricolage Grotesque 800**, tracking −2%.
- Palette (updated 2026-10-18 to match the app's Bubbly Cheese restyle, `camera-project` branch `trycheese-v1`, `lib/app/theme/app_colors.dart`): Darkroom `#0C0C0B`, Surface `#1C1B19`, Paper `#F3EDE3`, Grain `#8A8178`, **Cheese `#FFD21A`** (brand colour; big cheese surfaces use the icon's puff gradient `#FFE60C` → `#FFC600`), Cream `#FFF8E1`, Negative blue `#0D25AA` ("developing"), Gouda `#C8742B` and Smoked `#6E6760` as page colours, Alert `#FF6B55`. Safelight red is retired. Warm black, never pure `#000`.
- Type (same date, matching the app): one display face, Bricolage Grotesque ExtraBold, for every headline; the second half of a headline stays in the display face and takes the section's accent colour (cheese on dark and blue, ink on cheese, cream on Gouda). Instrument Sans for UI and body, Instrument Sans 500 in sentence case for small labels and film-edge markings `trycheese ▸ 400 ▸ 01A`. Instrument Serif is retired.
- Photos: the app's look samples (`public/samples`) are illustrative, not shot on trycheese; every one is labelled "Sample" on the site.
- Voice: `brand/voice.md`: casual, playful, enthusiast-fluent; never fake nostalgia; looks are "looks", never "filters".
- Reference the user made binding for structure: https://www.lampa.camera/ ("this website is how I want things"); neighbour: https://www.mood.camera/.

## Evidence on Hand

- Brand assets: `camera-project/brand/assets/logo/final/` (wordmarks, app icon, OG image).
- No ratings, reviews, download counts, testimonials, press or real photos exist. Never fabricate them.

## Product Principles

1. Prove the look; don't claim it.
2. Stay in the moment, not in the settings.
3. Both platforms, equal citizens.
4. Private and free by default: say what actually happens.
