---
name: Modern Luxury E-Commerce
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#45464c'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#5d5f5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#636564'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca830'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c7c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 120px
---

## Brand & Style

The brand personality is rooted in **Modern Minimalism**, emphasizing exclusivity through restraint and precision. The target audience is a discerning, high-net-worth demographic that values quality over quantity and seeks a curated, serene shopping experience.

The design style utilizes **high-contrast typography** and **generous whitespace** to create an editorial feel, similar to a physical fashion lookbook. We employ a **Corporate / Modern** base with **Minimalist** execution, using subtle **Glassmorphism** for navigational elements to maintain a sense of lightness and depth. The goal is to evoke an emotional response of "effortless sophistication"—where the interface recedes to let the high-fidelity product photography become the primary focus.

**Key Stylistic Pillars:**
- **Extreme Whitespace:** Layouts must feel uncrowded to signal luxury.
- **Micro-interactions:** Transitions should be fluid and intentional, avoiding abrupt changes.
- **Tactile Accents:** Gold and emerald tones are used sparingly to highlight premium collections and primary actions.

## Colors

The palette is anchored by a deep obsidian (`--primary`) and a warm stone (`--secondary`), creating a sophisticated, high-contrast foundation. 

- **Primary & Secondary:** Used for structural elements and the primary "Ink on Paper" text effect.
- **Gold Accents:** Reserved strictly for premium labels, loyalty status, and high-value callouts to maintain its prestige.
- **Success & Action:** An elegant emerald green (`--accent`) provides a modern, energetic contrast to the traditional luxury palette, used for confirmation and key functional buttons.
- **Surface Strategy:** The background uses a slightly off-white (`--background`) to reduce eye strain and provide a more expensive feel than pure hex white, which is reserved for content cards.

## Typography

This design system utilizes a classic **Serif/Sans-Serif pairing** to balance heritage with modernity. 

- **Display & Headlines:** Use **Playfair Display**. Its high stroke contrast and elegant terminals communicate luxury and editorial authority.
- **Body & Interface:** Use **Plus Jakarta Sans**. Its modern, open counters ensure maximum readability for product descriptions and transactional details across all device types.
- **Functional Labels:** All-caps styling with slight tracking (letter-spacing) should be applied to secondary navigation, badges, and small labels to provide a "designed" architectural feel.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1440px max-width container to preserve the editorial composition on ultra-wide displays.

- **Desktop (12 Columns):** Uses a 24px gutter with substantial 80px side margins to "breathe."
- **Mobile (4 Columns):** Margins shrink to 20px, and vertical stacking becomes the primary focus. 
- **The "Luxury Gap":** Section spacing is intentionally oversized (120px+) to ensure that product categories and editorial stories feel distinct and important. 
- **Alignment:** Consistent use of a base-8 rhythm for internal component padding, ensuring mathematical harmony across the UI.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Ambient Shadows** rather than heavy borders or flat color blocks.

1.  **Level 0 (Base):** `--background` color. No shadow.
2.  **Level 1 (Cards):** Uses `--shadow-sm` on white surfaces. This provides a subtle lift for product tiles.
3.  **Level 2 (Navigation/Headers):** Uses `--header-backdrop` (blur) and `--header-bg` (alpha transparency). It creates a "frosted" layer that floats above the content during scroll.
4.  **Level 3 (Modals/Quick-View):** Uses `--shadow-xl` to create a dramatic sense of focus, dimming the background with `--overlay`.
5.  **Product Focus:** Specifically for featured garments, `--shadow-product` is used to create a deep, professional studio-lighting effect that makes the product "pop" off the screen.

## Shapes

The shape language is **Refined and Soft**. We avoid the harshness of sharp corners but reject the playfulness of full circles.

- **Standard Elements:** Buttons and input fields use `--radius-sm` (10px).
- **Large Containers:** Product cards and image galleries use `--radius-md` (14px) or `--radius-lg` (18px) to soften the visual impact of large photography.
- **Interactive Pill:** Only "Add to Cart" or "Buy Now" primary actions may use `--radius-full` for high touchability and distinction.

## Components

### Buttons
- **Primary:** Filled with `--primary`, using white text. On hover, transitions to `--btn-primary-hover` with a slight scale-up (1.02).
- **Secondary:** Outlined or white-filled with `--border`. Uses `--transition` for background color shifts.
- **Accent:** Reserved for seasonal sales or specific "New In" collections using `--accent`.

### Input Fields
- Fields use a minimalist bottom-border only or a very light `--border-light` stroke. 
- Focus state is indicated by a subtle `--input-focus` (emerald) underline or ring, never losing the clean profile.

### Cards (Product Tiles)
- Images should have a 4:5 or 2:3 aspect ratio.
- Information (Title, Price) is center-aligned to mimic boutique signage.
- Hovering over a card triggers a "Quick Add" overlay using the glassmorphic `--overlay-light`.

### Badges
- **Sale:** High-impact red (`--badge-sale`) but kept small and typographic.
- **New/Premium:** Using `--gold` or `--badge-new` (blue) with the `label-sm` typography style.

### Lists & Navigation
- Menu items use `label-sm` with a custom hover underline that grows from the center.
- Mobile navigation relies on full-screen overlays with the `--header-backdrop` effect to maintain the luxury aesthetic.