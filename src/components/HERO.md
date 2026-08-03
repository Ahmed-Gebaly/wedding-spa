# Hero Component Documentation

## Overview

`Hero` is a premium cinematic entry scene for the wedding invitation.
It is designed to behave like a handcrafted luxury album opening.

## Files

- `hero.tsx`: main UI component
- `hero.constants.ts`: all tunable values and particle definitions
- `hero.motion.ts`: Framer Motion variants
- `use-hero-parallax.ts`: desktop parallax hook with reduced-motion support

## Usage

```tsx
<Hero onBeginStory={handleOpenInvitation} />
```

`onBeginStory` is required and should reveal the rest of the invitation.

## Photo Requirements

- Path: `/public/images/photo-hero.png`
- Aspect ratio: `4:5` portrait
- Recommended: `2000x2500` minimum
- Preferred: `3000x3750`
- Fit: `object-cover`, centered crop

## Photo Framing Spec (Important)

- Keep both faces inside the middle area of the photo.
- Safe zone for faces:
	- Horizontal: `20%` to `80%` of image width
	- Vertical: `18%` to `62%` of image height
- Leave the lower `30%` softer/cleaner because names and CTA sit there.
- Avoid placing heads at the very top edge; keep top head margin around `8%` to `12%`.
- Avoid very dark photos; target medium-bright exposure for legible overlays.

### Responsive Focal Points (implemented)

- Mobile focal point: `object-position: 52% 38%`
- Desktop focal point: `object-position: 50% 42%`

This means on mobile we bias slightly upward to keep faces visible above text overlays, and on desktop we relax toward center for a more cinematic composition.

## Export Spec

- File name: `photo-hero.png`
- Folder: `public/images/`
- Resolution options:
	- Standard: `2400x3000`
	- High quality: `3000x3750`
- Format: JPEG, quality `82%` to `88%`
- Ideal file size: `350KB` to `1.2MB`

## Motion & Accessibility

- Entrance: slow image zoom and fade, names/date staged reveal
- Begin action: `BEGIN OUR STORY` CTA with glass-style luxury button + arrow loop
- Parallax: desktop only
- If user prefers reduced motion, heavy motion/parallax/particles are disabled

## Entry Gestures

- Scroll down on desktop hero to open invitation scenes.
- Swipe up on mobile hero to open invitation scenes.
- CTA tap/click still opens invitation scenes.

## Music Behavior

No autoplay. Music begins only after `Begin Our Story` interaction and fades in over 2.5s.
