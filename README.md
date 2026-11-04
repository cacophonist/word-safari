# Word Safari 🐾

A colourful learning game for Tanya, Kabir, and other young learners.

## Play

Choose **Beginner** (the default) for three-letter words, two answer choices, and counting 1–5 strawberries. Choose **More practice** for four- and five-letter words, more answer choices, and multiplication using equal groups from 1–10.

- **Word Scramble:** tap letter tiles to spell the picture. Use Undo, Start again, tap a filled space, or ask for a Hint. Each hint keeps the correct beginning and reveals one more letter.
- **Missing Letter:** choose the letter that fills the gap.
- **Word Match:** choose the word for the picture.
- **Strawberry Maths:** count berries or equal groups and enter the total.

Instructions remain on screen. Hear instructions and Hear word/question use the browser's speech synthesis when available. Audio starts only after a tap; Stop audio, Home, and Next cancel playback. Voice availability depends on the browser/device, and text instructions remain available if speech fails.

Correct answers earn 10 stars once per question. Next question advances at the child's pace. Scores and the selected level last for the current page session.

The curated word bank in `src/game.js` uses singular, recognisable emoji pairs. Incorrect and ambiguous pairs from the original bank have been corrected or removed, including DESK/chair, PLUM/peach, MICE/mouse, and FORK/cutlery. Emoji appearance varies by device.

## Develop and check

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Vite serves the app at `/word-safari/`. Game tests cover difficulty boundaries, valid choices, missing-letter positions, answer checking, corrected picture labels, repeated-letter hints, and undo/retry logic.

## GitHub Pages

The existing deployment uses the `gh-pages` branch. After merging source changes into main, run `npm ci` and `npm run deploy` to build and publish the site. A source pull request by itself does not update the live game.
