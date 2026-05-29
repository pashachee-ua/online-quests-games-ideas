# Batch 1 Top Cover Image Prompts

Purpose: prompts for generating cover images for the strongest Batch 1 validation candidates in the game ideas showcase.

Source of candidates: `src/data/ideas/batch-1.ts` and the Batch 1 takeaways from `GAME_IDEAS_PROS_CONS.md`.

Recommended output:

- Aspect ratio: `16:10`
- Suggested size: `1600x1000`
- Use as: game cover / idea detail hero image
- No readable text inside the image; titles are rendered by the web UI.
- Avoid corporate stock-photo style, horror, weapons, real brand logos, UI screenshots, and tiny unreadable interface text.

Shared visual direction:

> Premium cinematic editorial illustration for a browser-based online team-building quest platform, smart and polished, suitable for IT teams and HR buyers, warm amber accent light with deep teal and neutral graphite, subtle mystery, clean composition, high-end digital art, no text, no logos, no watermark, no photorealistic people posing for camera.

## 10. Фрагменты

Suggested file: `public/images/ideas/fragmenty-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online team-building game called "Fragments": several remote participants are represented by separate glowing puzzle-like shards of one larger map/document, each shard floating in a shared digital workspace, thin connection lines gradually revealing the hidden whole. The mood is collaborative discovery, not dark crime. Show fragmented evidence, partial diagrams, map pieces, and soft browser-like glass panels without readable text. Warm amber highlights, deep teal shadows, graphite background, polished modern web product aesthetic, dynamic but clean composition, 16:10 aspect ratio, no text, no logos, no watermark.
```

## 6. Wavelength

Suggested file: `public/images/ideas/wavelength-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online team-building calibration game inspired by a hidden spectrum: a luminous arc-shaped dial stretches between two abstract poles, with several subtle participant cursors converging toward a hidden glowing target zone. The image should feel like a smart collaborative decision-making interface, elegant and minimal, with emotional tension but no chaos. Warm amber signal glow, deep teal and graphite background, soft volumetric light, refined digital art, no readable UI text, no logos, no watermark, 16:10 aspect ratio.
```

## 2. Cross Clues

Suggested file: `public/images/ideas/cross-clues-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online team puzzle game based on crossing clues: an elegant grid of floating clue cards and coordinate lines forms a glowing matrix in a shared digital workspace. A few cards are highlighted where rows and columns intersect, suggesting the team is decoding a hidden pattern. Make it feel intelligent, collaborative, and web-native, with no readable words on the cards. Warm amber highlights, deep teal shadows, graphite neutrals, crisp modern product illustration, subtle depth, 16:10 aspect ratio, no text, no logos, no watermark.
```

## 1. Just One

Suggested file: `public/images/ideas/just-one-cover.png`

Prompt:

```text
A premium cinematic cover illustration for a cooperative clue game: several anonymous glowing note cards float around one central hidden answer card, while duplicate clue cards fade out or dissolve, leaving one clean unique clue path. The composition should communicate simplicity, teamwork, and a quick warm-up game for a polished online event. Use abstract cards and icons only, no readable text. Warm amber accent light, deep teal and graphite background, soft shadows, refined digital illustration, friendly but not childish, 16:10 aspect ratio, no logos, no watermark.
```

## 7. Herd Mentality

Suggested file: `public/images/ideas/herd-mentality-cover.png`

Prompt:

```text
A premium cinematic cover illustration for a team synchronization game: many small glowing answer tokens from different participants flow toward a shared majority cluster in the center, while one or two tokens remain slightly apart. The visual should suggest group intuition, alignment, and playful social comparison without using animals or literal crowds. Abstract participant avatars, answer bubbles, and soft network lines in a modern browser-game atmosphere. Warm amber central glow, deep teal shadows, graphite background, polished digital art, 16:10 aspect ratio, no readable text, no logos, no watermark.
```

## Shared Negative Prompt

```text
readable text, misspelled words, logos, watermarks, brand names, stock photo, office meeting photo, photorealistic corporate people, horror, gore, weapons, police tape, magnifying glass cliche, detective noir cliche, overly dark image, childish cartoon, cluttered UI, tiny unreadable interface labels, low resolution, blurry, distorted hands, extra fingers
```

## Notes

- `Фрагменты` is the main practical Batch 1 highlight, so generate it first.
- Keep all five covers visually related: same palette, similar lighting, abstract web-product language.
- If an image model supports style references, use the first approved `Фрагменты` cover as the style reference for the remaining four.
