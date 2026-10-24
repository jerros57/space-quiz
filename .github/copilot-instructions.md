# Copilot instructions

## Project structure and architecture

- The project is a standalone Spanish-language quiz implemented in `index.html`, including the markup, styles, question data, and application logic. It has no build system or runtime dependencies.
- The page has three UI states in one mission card: start, quiz, and results. The inline script owns question progression, shuffled answer order, mission/practice-round state, score/progress updates, and result rendering.
- CSS custom properties in `:root` define the light theme; `@media (prefers-color-scheme: dark)` overrides them for dark mode. The responsive layout, galaxy backdrop, and reduced-motion handling are CSS-only.

## Build, test, and lint

- No build, test, or lint commands are configured in the project.
- To preview the app, open `index.html` directly in a browser.
- Smoke-test the flow in a browser: start the mission, try correct and incorrect answers, advance through all questions, and confirm the final score and restart behavior.

## Codebase conventions

- Keep changes self-contained in `index.html`; avoid adding dependencies or a build step for this standalone app.
- User-facing copy and quiz content are in Spanish. Questions use `{ category, question, answers, correct, fact }`; `correct` is a zero-based index into `answers`.
- If the question count changes, keep the start-screen summary, displayed total, progress-bar maximum, and results denominator consistent with `questions.length`; prefer deriving these values from the array to avoid mismatches.
- Keep generated answer text as text (DOM `textContent`) and construct answer controls with DOM APIs rather than interpolating quiz content into HTML.
- Preserve the existing semantic and accessible interaction patterns: native buttons, visible keyboard focus, focus movement when changing screens, and live regions for question, score, and feedback updates.
- Keep theme-specific colors in CSS custom properties and provide corresponding overrides for both color schemes when introducing new colors.
- Honor `prefers-reduced-motion` for any new animation or transition.
