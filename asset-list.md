# Ovrin Redesign Asset List

## Existing Repo Assets

- `assets/logo-mark-72.webp` and `assets/logo-mark-120.webp` - Ovrin logo mark.
- `assets/hero-static-640.webp`, `assets/hero-static-960.webp`, `assets/hero-static-1120.webp` - current full hero visual.
- `assets/pipe-fallback.svg` - lightweight pipe/leak fallback.

## New Planning / Prototype Assets

- `DESIGN.md` - Ovrin design-system source of truth using the DESIGN.md token format.
- `prototype.html` - editable comparison board with three distinct variants:
  - Leak Detector: urgent problem-first lander.
  - Pipe Fitter: trust/process lander.
  - Green Drip: minimal/memorable lander.
- `output/deepseek-design-package.json` - ignored DeepSeek worker output used as source material.

## Motion / Interaction Assets

- Production hero uses DOM/SVG/CSS overlays plus GSAP for pipe shimmer, drops, route motion, and counters.
- Prototype board uses pure CSS animation and static HTML controls.
- No video asset is required.

## Removed / Excluded

- No Blender, Remotion, HyperFrames, or shadcn runtime is required for the current static site.

## Missing Inputs

- Real customer proof, testimonials, or booked-job metrics are still placeholders until supplied.
