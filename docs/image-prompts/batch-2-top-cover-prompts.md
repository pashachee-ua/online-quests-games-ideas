# Batch 2 Top Cover Image Prompts

Purpose: prompts for generating cover images for the strongest Batch 2 validation candidates in the game ideas showcase.

Source of candidates: `src/data/ideas/batch-2.ts` and the Batch 2 takeaways from `GAME_IDEAS_PROS_CONS.md`.

Recommended output:

- Aspect ratio: `16:10`
- Suggested size: `1600x1000`
- Use as: game cover / idea detail hero image
- No readable text inside the image; titles are rendered by the web UI.
- Avoid corporate stock-photo style, horror, weapons, real brand logos, UI screenshots, and tiny unreadable interface text.

Shared visual direction:

> Premium cinematic editorial illustration for a browser-based online team-building quest platform, smart and polished, suitable for IT teams and HR buyers, warm amber accent light with deep teal and neutral graphite, subtle mystery, clean composition, high-end digital art, no text, no logos, no watermark, no photorealistic people posing for camera.

## 13. Слепая дешифровка

Suggested file: `public/images/ideas/slepaya-deshifrovka-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online team-building game about blind decryption: two separated groups of anonymous participant avatars work in parallel digital spaces, one side sees abstract cipher blocks, the other side sees glowing key fragments, and only three narrow message beams connect them. Show tension, precision, and collaboration under constraints, with elegant encrypted symbols that are not readable text. Warm amber signal light, deep teal shadows, graphite background, refined browser-game aesthetic, clean composition, 16:10 aspect ratio, no readable text, no logos, no watermark.
```

## 20. Распределённый пульт

Suggested file: `public/images/ideas/raspredelennyy-pult-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online cooperative control-panel game: multiple remote participants each control a separate glowing lever, dial, switch, or button in a shared digital command console, while a central system core responds to their synchronized actions. The scene should feel like coordinated teamwork, real-time pressure, and polished web interaction, not a generic spaceship cockpit. Warm amber highlights, deep teal and graphite interface surfaces, subtle motion trails, high-end digital art, 16:10 aspect ratio, no readable labels, no logos, no watermark.
```

## 12. Двойная реальность

Suggested file: `public/images/ideas/dvoynaya-realnost-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online team game about two versions of reality: two parallel glass panels show the same elegant room or workspace from slightly different realities, with a few subtle impossible differences glowing softly between them. Anonymous participant cursors and observation markers compare the two panels. The mood is curious, intelligent, and mysterious without horror. Warm amber anomaly glow, deep teal shadows, graphite neutrals, polished modern digital illustration, 16:10 aspect ratio, no readable text, no logos, no watermark.
```

## 11. Свидетели события

Suggested file: `public/images/ideas/svideteli-sobytiya-cover.png`

Prompt:

```text
A premium cinematic cover illustration for an online team-building game about witnesses reconstructing an event: several floating video-like perspective panels show different angles of the same ambiguous moment, while a central reconstruction board gradually combines their observations into one coherent picture. Keep the event neutral and nonviolent, like a mysterious system incident or unexpected room change. Warm amber highlights, deep teal and graphite background, elegant digital workspace, subtle timeline fragments, 16:10 aspect ratio, no readable text, no logos, no watermark.
```

## 18. Запрещённые слова / Taboo

Suggested file: `public/images/ideas/zapreshchennye-slova-taboo-cover.png`

Prompt:

```text
A premium cinematic cover illustration for a fast online clue game with forbidden words: one central concept card glows in the middle, surrounded by several redacted or blocked clue cards that fade away, while clean alternative clue paths light up around them. The image should communicate quick thinking, verbal creativity, and playful constraint inside a polished web event. Use abstract cards, speech bubbles, and soft digital shapes only, with no readable words. Warm amber accents, deep teal and graphite background, refined digital art, 16:10 aspect ratio, no logos, no watermark.
```

## Shared Negative Prompt

```text
readable text, misspelled words, logos, watermarks, brand names, stock photo, office meeting photo, photorealistic corporate people, horror, gore, weapons, police tape, magnifying glass cliche, detective noir cliche, overly dark image, childish cartoon, cluttered UI, tiny unreadable interface labels, low resolution, blurry, distorted hands, extra fingers
```

## Notes

- `Слепая дешифровка` and `Распределённый пульт` are the most practical Batch 2 candidates, so generate these first.
- Keep the Batch 2 covers consistent with Batch 1: same palette, lighting, aspect ratio, and abstract browser-product language.
- If an image model supports style references, use the approved Batch 1 or `Слепая дешифровка` cover as the visual reference for the remaining Batch 2 images.
