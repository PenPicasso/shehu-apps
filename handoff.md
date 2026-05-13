# Ovrin Redesign Handoff

## Goal

Create a simple, functional Ovrin lander for HVAC lead recovery. Remove the video element entirely. Keep the site static, editable, responsive, and deployable on Vercel.

## Current Direction

Use `DESIGN.md` as the design-system source of truth. Keep the brand white/black/green with copper and water accents used only for the leak metaphor.

DeepSeek was used as implementation muscle to generate raw direction options. Codex reviewed and integrated the useful pieces.

## Prototype Board

Open `prototype.html` to compare three distinct but brand-aligned directions:

1. **Leak Detector** - urgent, conversion-first, problem-led.
2. **Pipe Fitter** - trust-first, process/system repair.
3. **Green Drip** - minimal, memorable, typography-led.

Recommended production direction: **Leak Detector**, because it explains the pain fastest and matches the existing pipe/leak asset.

## Production Page Changes

- Removed the video section and its JS tracking behavior.
- Added a proof/audit band that explains the no-video conversion promise.
- Preserved the hero CTA, leak audit route, form behavior, analytics data attributes, and static architecture.
- Kept hero motion subtle and reduced-motion aware.

## Skill Contributions

- `grill-me`: clarify offer and conversion pressure.
- `design-consultation`: define design system and brand rules.
- `visual-thinking-spec`: keep visual structure and artifacts inspectable.
- `prototype` / `design-shotgun`: create three directions before committing.
- `plan-design-review` / `design-review`: critique before and after build.
- `codex-deepseek-secure`: DeepSeek generates options; Codex plans, reviews, verifies.
- `design-html`: production static HTML/CSS direction.
- `playwright`: screenshot/browser proof.
- `GitHub` / `Vercel`: branch, PR, deployment once approved.
- `shadcn`: future-only if the site moves to React/Tailwind.

## Acceptance Checklist

- No fake player, media section, or video tracking markup remains.
- `npm run check` passes.
- `npm run build` passes.
- `public/prototype.html` exists after build.
- Desktop and mobile screenshots are inspected.
- `.env` is ignored and never staged.
