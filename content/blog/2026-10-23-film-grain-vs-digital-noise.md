---
title: "Film grain vs digital noise: what's the difference?"
slug: film-grain-vs-digital-noise
description: "Film grain vs digital noise: where each one comes from, why grain reads as texture and noise as damage, and how to spot digital grain that's just an overlay."
date: 2026-10-23
topic: grain-and-halation
keyword: film grain vs digital noise
tags: [film grain, digital noise, grain, phone photography, film looks, iso]
sources:
  - title: "Canon Europe: Noise reduction options explained"
    url: https://www.canon-europe.com/pro/stories/noise-reduction-low-light/
  - title: "Cambridge in Colour: Image Noise: Examples and Characteristics"
    url: https://www.cambridgeincolour.com/tutorials/image-noise-2.htm
  - title: "Dehancer: How does film grain work in Dehancer OFX plugin"
    url: https://www.dehancer.com/learn/articles/how-does-film-grain-work-in-dehancer-ofx-plugin
  - title: "Kodak Alaris: Kodak Professional Portra 400 Film, technical data E-4050 (January 2025)"
    url: https://kodakprofessional.com/sites/default/files/2025-07/e4050.pdf
  - title: "Ilford Photo: Choosing your first ILFORD film (30 March 2017)"
    url: https://www.ilfordphoto.com/choosing-your-first-ilford-film/
  - title: "Fujifilm X Learning Centre: Color Chrome and Film Grain Effects"
    url: https://www.fujifilm-x.com/en-gb/learning-centre/color-chrome-and-film-grain-effects/
faq:
  - q: "Is film grain the same as digital noise?"
    a: "No. Film grain is the structure the image is made of: the developed, light-sensitive particles in the emulsion. Digital noise is random error mixed into the sensor's signal, and it's most visible where the least light reached the sensor."
  - q: "Why does digital noise show up in the shadows?"
    a: "Shadows received less light, so there's less image information relative to the noise. Canon explains that raising ISO amplifies both the image and the noise, and that brightening shadows later reveals noise that was already there."
  - q: "Why does film grain look better than noise?"
    a: "Grain is tied to the image's tones and has a consistent structure, so it reads as texture. Digital noise includes colour speckle and blotches, and Cambridge in Colour notes that colour noise in particular looks unnatural."
  - q: "What does Fujifilm's Grain Effect do?"
    a: "Fujifilm says it adds a controlled amount of random noise to simulate film grain. Recent X Series and GFX cameras let you set Roughness (off, weak or strong) and Size (small or large)."
---

**Film grain vs digital noise** looks like a close contest at a glance: both are random speckle, both get worse in low light, and both show up when you zoom in. But they come from opposite places. Grain is what a film image is made of. Noise is error mixed into a digital image.

That difference is why one reads as texture and the other as damage, and why so much "film grain" on phones doesn't quite convince.

## Film grain vs digital noise at a glance

| | Film grain | Digital noise |
| --- | --- | --- |
| What it is | The developed particles that make up the image | Random error mixed into the sensor's signal |
| Where it shows most | Tied to how dense the negative is | In the shadows, where the least light landed |
| What makes it finer | Slower film, finer-grain emulsions | More light, bigger pixels, noise reduction |
| How it's judged | Kodak rates graininess on a print | Usually by how far pixels stray from their true value |

## What film grain actually is

On film, there's no clean image underneath the grain. The picture is the grain: light-sensitive crystals in the emulsion that develop into the tones you see. Dehancer's write-up on its grain engine puts it well. Grain has texture and forms a structure, so it can't be smaller than a certain size without turning into plain noise.

Grain also follows the image. Dehancer notes there's always considerable grain in the highlights, because those areas are the densest part of a negative, and grain turns up in deep shadows too. It isn't sprinkled evenly over the frame.

How much grain you get depends on the stock. Ilford's rule of thumb is that slower films have finer grain, and its Delta films get less grain for their speed than its traditional Plus films. Kodak's datasheet bills Portra 400 (now also sold as [Ektacolor Pro 400](/blog/ektacolor-pro-vs-portra)) as the world's finest-grain high-speed colour negative film.

One more detail matters: grain is about what you see at a given size. Kodak's Portra 400 datasheet rates graininess with a Print Grain Index, a method that measures graininess in a print rather than on the negative itself. Blow a frame up and the grain grows with it.

## What digital noise actually is

Digital noise is the opposite story. Canon Europe's explainer says there's random visual static in every digital image. It becomes obvious at high ISO or in long exposures, because those are the conditions with the poorest ratio of image information to noise. Turning up ISO amplifies both, so the noise becomes more visible. Brightening the shadows later doesn't create noise. It reveals noise that was there all along.

Canon splits it into two stages. Some noise arrives at capture, from effects like photon shot noise and crosstalk on the sensor. Other noise is generated during processing, and comes in two kinds: chrominance (colour) noise and luminance (brightness) noise.

Cambridge in Colour's tutorial adds the patterns worth knowing:

- **Darker areas are noisier.** On a digital camera, darker regions carry more noise than bright ones, and the tutorial notes that film tends the other way.
- **Colour noise looks worst.** Chroma noise is usually the more unnatural-looking kind.
- **Bigger pixels help.** Larger pixels gather more light, so cameras with them generally look less noisy.

## Why grain looks good and noise doesn't

Put those together and the difference in feel makes sense. Grain is consistent with the tones it builds, so your eye reads it as the surface of the picture. Noise is error, and it shows up as colour speckle and blotches in exactly the places with the least real information.

Size matters too. Cambridge in Colour points out that film photographers called short, tight fluctuations "fine-grained", and that fine noise looks far less noisy than coarse noise of a similar strength. Texture at the right scale feels like detail.

Then there's the clean-up. The same tutorial warns that completely removing luminance noise leaves images looking plasticky. Phones lean hard on clean-up. Canon describes multi-shot noise reduction, which stacks several frames and keeps only what's consistent between them, and phone cameras routinely merge several frames into one photo. That's a big part of why phone shots look so smooth and waxy, as we cover in [why phone photos look overprocessed](/blog/why-phone-photos-look-overprocessed).

Here's the twist: digital grain is noise, on purpose. Fujifilm is refreshingly direct about its in-camera Grain Effect, which adds a controlled amount of random noise to simulate film grain, with Roughness and Size settings. The question is never whether a digital grain effect is "real". It's whether the noise is designed to behave like grain.

## How to spot digital grain that's just an overlay

Dehancer draws the key distinction: grain generated from each image's own colour and brightness, versus a scanned grain texture laid over a photo, which has nothing to do with what's in the frame. You can usually tell which one you're looking at:

1. **It's identical everywhere.** The same speckle in the sky, the skin and the shadows means it isn't following the image.
2. **It's colourful.** Red, green and blue specks are chroma noise, not grain.
3. **It repeats.** Zoom in on a flat area. A pattern that tiles is a texture, not grain.
4. **There's waxy skin underneath.** Grain over a smoothed, noise-reduced photo looks like sand on plastic. Film never had a smoothing step.
5. **Its size doesn't fit the look.** A bright, slow-film look with chunky grain, or a gritty night look with almost none, breaks the illusion.
6. **Sharpening halos poke through.** Grain on top of over-sharpened edges is one of the [six tells of a fake film look](/blog/what-makes-photos-look-like-film).

If you shoot black and white, grain matters even more. It's one of the three ingredients behind [the black and white film look](/blog/black-and-white-film-look), and choosing classic or clean grain changes the whole mood.

## Where trycheese fits

We treat grain like film speed, because that's how it works on film. Each look in trycheese's catalogue lists its grain on the [looks section](/#looks), from Grain 100 on clean looks like Mozz and Fresh up to Grain 1600 on Smoked, our hard black and white. You pick a look before you shoot, then turn two dials, grain and tone, to taste. The grain is rendered into the photo at the shutter alongside halation and a filmic tone curve, and there's [no live filter preview](/#in-the-moment).

trycheese isn't out yet. It's coming to iPhone and Android together, free at launch. Until then, try the checklist above on any film-look photo in your feed. Once you see an overlay, you can't unsee it.
