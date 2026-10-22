---
title: "What makes a photo look like film? 6 tells, explained"
slug: what-makes-photos-look-like-film
description: "What makes a photo look like film? Highlight roll-off, stock colour, grain, halation and softness: how each one works, and how to spot a fake film look."
date: 2026-10-20
updated: 2026-10-21
topic: film-looks
keyword: what makes a photo look like film
tags: [film looks, film grain, halation, colour negative, slide film, phone photography]
sources:
  - title: "Kodak Alaris: Kodak Professional Portra 400 Film, technical data E-4050 (January 2025)"
    url: https://kodakprofessional.com/sites/default/files/2025-07/e4050.pdf
  - title: "Dehancer: Film Compression"
    url: https://dehancer.com/learn/article/film-compression
  - title: "Dehancer: How does film grain work in Dehancer OFX plugin"
    url: https://www.dehancer.com/learn/articles/how-does-film-grain-work-in-dehancer-ofx-plugin
  - title: "Fujifilm X Stories: Film Simulation \"CLASSIC CHROME\" (2014)"
    url: https://www.fujifilm-x.com/global/stories/film-simulation-classic-chrome/
  - title: "Google: 7 can't-miss updates from our Pixel 11 launch"
    url: https://blog.google/products-and-platforms/devices/pixel/pixel-11-features/
faq:
  - q: "What makes a photo look like film?"
    a: "Mostly tone and texture: highlights that roll off gradually instead of clipping, colour set by a specific film stock, grain that's part of the image, and halation around bright lights. A convincing film look gets several of these right at the same time."
  - q: "What's the difference between a colour negative and a slide film look?"
    a: "Colour negative film, such as Kodak Portra, loses saturation as highlights get brighter, so the brightest areas turn soft and pale. Slide (reversal) film holds deep, dense colour much further into the highlights, which is why it reads punchier."
  - q: "Is adding grain enough to make a photo look like film?"
    a: "No. Grain helps, but on its own it usually reads as a texture laid over a digital photo. The tone curve and colour do most of the work, and grain and halation finish it."
---

**What makes a photo look like film** isn't one effect. It's a handful of traits that come straight out of the chemistry: highlights that ease off instead of clipping, colour that belongs to a specific stock, grain woven into the image, a glow around bright lights, and a gentler kind of sharpness.

A convincing film look gets most of these right at once. A cheap one nails a single trait, usually grain or an orange tint, and stops there. Here's what each tell is, why it happens, and how to spot the fakes.

## The quick answer: 6 tells of a film photo

| Tell | What film does | What a typical phone photo does |
| --- | --- | --- |
| Highlights | Roll off gradually and lose saturation as they brighten | Clip to white, or get pulled down by HDR |
| Shadows | Allowed to go deep; contrast comes from the stock | Lifted so every corner shows detail |
| Colour | Set by the stock: skin, greens and skies each shift their own way | Tuned for accuracy and punch |
| Grain | Part of the image's structure, in shadows and highlights alike | Smoothed away by noise reduction |
| Halation | A red-orange glow around strong lights | Nothing, or a generic bloom |
| Sharpness | Fine detail without outlines | Edge sharpening with visible halos |

The first three are about tone and colour, and they do most of the work. The last three are texture, and they're what people notice first.

## Tone: highlights, shadows and the curve

Every film stock has a characteristic curve: a graph of how dense the negative gets as exposure increases. Kodak's data sheet for Portra 400 plots one for each of the blue, green and red layers. The shape matters more than any single number. At the bottom (the toe) shadows ease in. At the top (the shoulder) highlights ease out instead of slamming into a wall.

That shoulder is the biggest single difference from digital. Dehancer's documentation for its highlight tool puts it plainly: on negative film, highlight clipping happens much later than on a digital camera. It also notes that negative film noticeably loses saturation in the highlights. Put those together and you get the look people love on colour negative: bright skies and lit skin fade toward soft, pale tones rather than snapping to hard white.

Shadows behave the other way round from a modern phone. Film lets them sit dark, and the contrast you get is the contrast the stock was designed to give. Phone HDR does the opposite, lifting shadows and pulling highlights in until the whole frame lives in the middle. We dig into that in [why phone photos look overprocessed](/blog/why-phone-photos-look-overprocessed), and it's the first thing a good film look has to undo.

## Colour: the stock is the look

On film you don't pick a colour grade after the fact. You pick a stock before you shoot, and it decides how skin, foliage and sky render.

Kodak describes Portra 400 as delivering spectacular skin tones and exceptional colour saturation across a wide range of lighting. That's a promise about colour response, not a tint: warm skin stays warm without turning the whole frame orange. (Portra is now also sold as Ektacolor Pro. Here's [what Kodak's new film names mean](/blog/ektacolor-pro-vs-portra).)

Slide film is a different animal. Fujifilm's own film simulations make the split clear. Its Provia, Velvia and Astia modes were designed to deliver the deep colour tones of reversal (slide) film, while its Pro Neg modes emphasise skin tones. In Dehancer's highlight tool, the same split shows up as a single control: one end approximates negative film's paler highlights, the other end slide film's denser ones.

Not every film look has to copy a real stock, either. Fujifilm says its Classic Chrome mode wasn't designed to reproduce an existing film at all. It aims for the feel of documentary photographs and magazines, with low saturation and full-bodied tones. A film look can be a mood, as long as it behaves like film.

Phone makers have noticed. Google says some of the Pixel 11's new Camera Looks were built by rewriting colour lookup tables to emulate classic film chemistry. That's colour response work done at capture rather than a tint added later, and it's the right place to start.

## Texture: grain, halation and softness

**Grain.** On film, the image is made of grain. It isn't noise sprinkled on top. Dehancer's write-up on its grain engine makes two useful points. First, grain has structure, so it can't be smaller than a certain size without turning into plain noise. Second, it lives in both the highlights (where a negative is densest) and the deep shadows. Dehancer contrasts grain generated from the image's own colour and brightness with scanned grain laid over a photo, which isn't tied to what's in the frame. Grain can also be very fine: Kodak calls Portra 400 "the world's finest grain high-speed color negative film". Fine grain is still grain.

**Halation.** Around strong lights, colour film picks up a red-orange halo as light bounces back through the emulsion. It's one of the clearest film tells, and one of the most often faked. We explain [how halation forms and how to spot a convincing version](/blog/what-is-halation) in its own post.

**Softness.** Film isn't blurry. Kodak's sheet promises distinct edges and fine detail for Portra 400. What film doesn't have is the bright outline that digital sharpening draws around edges. Detail on film fades out. On a phone it gets underlined.

## How to spot a fake film look

Run a photo through this checklist. A real film look passes most of it, and a sticker fails fast:

1. **Highlights clip or go grey.** Hard white edges, or a flat grey sky with no gradient, mean there's no shoulder.
2. **Grain looks the same everywhere.** Identical speckle in the sky, the skin and the shadows, or a pattern that repeats, is an overlay.
3. **Every edge glows.** Halation needs a strong light. A glow on mid-grey edges is bloom with a red tint.
4. **The colour is a wash.** If skin, greens and sky have all shifted by the same orange-teal tint, it's a grade, not a stock.
5. **Sharpening halos under the grain.** A film look painted onto an over-sharpened HDR photo keeps its outlines. This is the classic filter-app tell, and the reason we prefer film looks [rendered at capture, not after](/blog/film-camera-apps-for-android-2026).
6. **Leaks and dust do all the talking.** Light leaks and scratches are accidents, not the look. Strip them out, and a real film look still reads as film.

## Where trycheese fits

This list is basically our spec sheet. trycheese is a film camera app for iPhone and Android, and its [film looks](/#looks) bake a filmic tone curve, grain and halation around the brightest highlights into the photo at the shutter. There's [no live filter preview](/#in-the-moment), partly because effects this heavy can't render accurately in real time, and partly because it keeps you looking at the scene.

It isn't out yet. When it is, it'll be free at launch on both stores. In the meantime, take any film-look photo you like and run it through the checklist above. It's a good way to train your eye.
