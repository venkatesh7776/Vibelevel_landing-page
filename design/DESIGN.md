# VibeLevel design language

Source: Figma file `uOy9JuizObwbgsSSob9ky9`, node `1:2` (Hero section, 1440 × ~1231).
The file defines **no Figma variables or styles**. Every value here was read from layer properties.
Tokens live in `tokens.css`. Values tagged `[extended]` there were added to round out the system.

## Feel
Clean, white, editorial. A single confident green accent. Black pill buttons with a soft inner sheen.
The green "dot-matrix" texture fades in from the top corners, and a large blurred green glow sits under the product media.

## Typography
| Role | Font | Weight | Size / line-height | Tracking |
|---|---|---|---|---|
| Display (H1) | Inter | 500 | 48 / 1.15 | -2px |
| Lead paragraph | Satoshi | 400 | 18 / 25.4 | 0 |
| Button (hero) | Satoshi | 500 | 16 / 20.4 | -0.51px |
| Button (nav) | Satoshi | 500 | 14 / 20.4 | -0.51px |
| Nav link | Satoshi | 500 | 14 / 14 | 0 |

The headline accent ("Great engineers") is `#008A43`. Satoshi files are in `fonts/` (400/500/700, from Fontshare). Inter comes from Google Fonts.

## Color
- Text and nav: `#000000`. Buttons and outlines: `#080808`. Background: `#FFFFFF`.
- Accent text: `#008A43`. Logo green ≈ `#0DEB86` (sampled from the raster, so approximate).
- Glows: `#1DC804` (dot-pattern ellipses, blur 100–110) and `#4CFB6C` (big blob, blur 310).
- Media scrim: `rgba(0,0,0,.3)`. Glass play button: `rgba(255,255,255,.26)` + 36px backdrop blur.

## Components
- **Nav**: 24px top/bottom × 80px side padding, 1280px wide, space-between. Logo → 32px gap → links (24px apart, with chevrons on Products and Platform). Right side: Sign in, 18px gap, then the "Book a demo" pill (120px wide, 8×20 padding).
- **Primary button**: `#080808` fill, pill radius 130, `inset 0 1px 8.5px rgba(255,255,255,.4)`, white Satoshi Medium text.
- **Outline button**: white fill, 1px `#080808` border, pill, 10×20 padding.
- **Hero copy stack**: 732px column, 26px gap, centered. Subtext column is 628px.
- **Media card**: 1060 × 630, radius 24, image + 30% black scrim, 113px glass play button centered (+12.5px down).

## Background construction
1. `assets/glow-mask.png` (412×900 @2x) is a **dot-pattern alpha mask**. It looks blank because it's white-on-transparent.
2. Green blurred ellipses (`glow-ellipse-1/2.svg`) are drawn through that mask on the left and right edges (the right one is mirrored), which produces the green dot texture in the top corners.
3. `bg-group.svg` is a huge blurred `#4CFB6C` blob behind and below the media card.

## Assets (`assets/`)
| File | Use |
|---|---|
| `logo-mark.png` | Full logo raster. Figma crops it to show only the star (32.5×26 slot) |
| `logo-wordmark.png` | "VibeLevel" wordmark (127.5×26 slot) |
| `hero-workspace.png` | Media card image (1628×966). Floating UI panels are baked in |
| `icon-play.svg` | Glass play button, 113×113 |
| `icon-chevron-down.svg` | Nav dropdown chevron, 24×14 |
| `glow-mask.png`, `glow-ellipse-1.svg`, `glow-ellipse-2.svg`, `bg-group.svg` | Background effects (see above) |

## Notes / open items
- Copy typo in Figma: "thorugh" → "through".
- The Figma frame is 900px tall, but its content extends to about 1231px.
- The nav container layer is named "HackerRank - Online Coding Tests…" (a leftover from a reference). Ignore it.
- Nothing is designed for mobile yet. Responsive behavior will need to be decided at build time.
