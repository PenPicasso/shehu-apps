---
version: alpha
name: Ovrin Lead Recovery
description: Static landing-page design system for HVAC lead recovery.
colors:
  ink: "#070707"
  forest: "#08351d"
  green: "#0aae2a"
  green-dark: "#087f22"
  green-soft: "#eaf9ee"
  copper: "#b85d2a"
  copper-dark: "#8d3f1d"
  water: "#168bb4"
  muted: "#5f6661"
  line: "#e6ebe7"
  paper: "#fbfdfb"
  white: "#ffffff"
typography:
  display:
    fontFamily: Inter, ui-sans-serif, system-ui
    fontSize: 80px
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: 0
  heading:
    fontFamily: Inter, ui-sans-serif, system-ui
    fontSize: 38px
    fontWeight: 820
    lineHeight: 1.08
    letterSpacing: 0
  body:
    fontFamily: Inter, ui-sans-serif, system-ui
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
rounded:
  sm: 6px
  md: 8px
  pill: 999px
spacing:
  xs: 8px
  sm: 14px
  md: 24px
  lg: 42px
  xl: 68px
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    radius: "{rounded.md}"
  card:
    backgroundColor: "{colors.white}"
    borderColor: "{colors.line}"
    radius: "{rounded.md}"
---

## Overview

Ovrin should feel like a credible HVAC lead-recovery system, not a generic AI landing page. The visual language combines clean white space, heavy black type, controlled green action states, and copper/water metaphors that make "leaking jobs" instantly understandable.

## Colors

Use black and white as the dominant system. Ovrin green is reserved for CTAs, positive recovery states, numbers, icons, and path motion. Copper is a supporting metaphor color for pipe imagery only. Water blue should appear sparingly on drops or leak details.

## Typography

Headlines are large, blunt, and highly readable. Body copy should stay plain and operational. Avoid cleverness when explaining the offer; HVAC owners should understand the value in one scan.

## Layout

Prefer a simple one-page conversion flow: hero, proof/audit promise, leak points, recovery process, audit inclusions, FAQ, footer. Cards use 8px radius or less. Avoid nested cards and marketing-heavy decorative sections.

## Motion

Motion should demonstrate recovery: drops fall, routes move, numbers count once, and CTAs respond softly. Do not use video as a primary section. Respect reduced-motion preferences.

## Components

Buttons are direct green rectangles with 8px radius. Cards are white, lightly bordered, and useful for repeated content only. Use icons to identify call, clock, form, calendar, shield, route, and booking actions.
