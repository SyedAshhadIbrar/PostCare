---
name: Clinical Precision
colors:
  surface: '#0e131f'
  surface-dim: '#0e131f'
  surface-bright: '#343946'
  surface-container-lowest: '#080e1a'
  surface-container-low: '#161c28'
  surface-container: '#1a202c'
  surface-container-high: '#242a36'
  surface-container-highest: '#2f3542'
  on-surface: '#dde2f3'
  on-surface-variant: '#e6bdb8'
  inverse-surface: '#dde2f3'
  inverse-on-surface: '#2b303d'
  outline: '#ac8884'
  outline-variant: '#5c403c'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690005'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#bf0715'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#6bd8cb'
  on-tertiary: '#003732'
  tertiary-container: '#008075'
  on-tertiary-container: '#ddfff9'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#0e131f'
  on-background: '#dde2f3'
  surface-variant: '#2f3542'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style

This design system is built for high-stakes medical diagnostic environments. It adopts a **Radioview AI aesthetic**, blending high-utility **Minimalism** with **Glassmorphism** to simulate the experience of a sophisticated medical monitor. 

The brand personality is authoritative, urgent, and technically precise. It evokes a "mission control" feeling, where every pixel is dedicated to clarity and decision-making speed. The interface relies on a deep-space backdrop to reduce eye strain during long shifts, using high-contrast "signal" colors to prioritize patient triage and diagnostic data.

## Colors

The palette is strictly functional, utilizing a "Signal-to-Noise" philosophy:

*   **Backgrounds:** True black (#000000) or Deep Charcoal (gray-950) to maximize contrast with diagnostic imagery.
*   **Primary (Crimson):** Reserved exclusively for high-priority alerts, critical findings, and urgent actions.
*   **Secondary (Amber):** Used for items requiring review, warnings, or medium-priority triage.
*   **Tertiary (Muted Teal):** Indicates routine status, normal readings, and completed tasks.
*   **Surface:** Glassmorphic containers using gray-900 at 70-80% opacity to maintain depth without distracting from the primary data layer.

## Typography

This design system uses a dual-font strategy to separate UI navigation from clinical data:

1.  **Hanken Grotesk (UI):** A contemporary sans-serif used for headers, navigation, and general interface text. It provides a modern, clean, and professional feel.
2.  **JetBrains Mono (Data):** Used for all patient metrics, timestamps, coordinates, and diagnostic values. The monospaced nature ensures that columns of numbers align perfectly for quick scanning, mimicking the readouts of medical hardware.

All data labels should be rendered in uppercase JetBrains Mono to distinguish them from interactive UI elements.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to ensure diagnostic tools remain in predictable positions. 

*   **Desktop:** 12-column grid with a 1440px max-width.
*   **Sidebar:** Fixed 280px sidebar for patient navigation and toolsets.
*   **Spacing Rhythm:** Based on a 4px baseline. Use 24px (6 units) for standard component spacing and 48px (12 units) for section decoupling.
*   **Responsive Behavior:** On mobile devices, the grid collapses to a single column, and glassmorphic cards expand to full-width to maximize screen real estate for imaging.

## Elevation & Depth

Visual hierarchy is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional shadows:

*   **Base Layer:** True black (#000000).
*   **Surface Layer:** Gray-900 with a 0.8 opacity and a 12px backdrop-blur. 
*   **Borders:** Use 1px solid borders (Gray-800). For active or focused states, the border should transition to the Primary or Tertiary color depending on the context.
*   **Inner Glow:** High-priority cards may feature a subtle 1px inner-top-border in a lighter gray to simulate a glass edge catching light.

## Shapes

The shape language is **Soft** (0.25rem - 0.75rem) to balance the clinical coldness of the dark theme. 

*   **Standard Cards:** 0.5rem (rounded-lg) for a modern, contained look.
*   **Toggles & Inputs:** 0.25rem (rounded) to maintain a precise, technical appearance.
*   **Interactive Overlays:** 0.75rem (rounded-xl) for modals and floating diagnostic panels.

## Components

*   **Glassmorphic Cards:** Background of `gray-900/80`, 1px border of `gray-800`, and `backdrop-blur-md`. These are the primary vessels for patient data.
*   **High-Contrast Buttons:** 
    *   *Critical:* Solid Crimson with white text, no border.
    *   *Secondary:* Outlined Amber with 10% Amber fill.
    *   *Ghost:* Transparent background with white text for low-priority actions.
*   **Large Toggles:** Oversized, tactile switches with clear "On" states using the Tertiary (Teal) color. Transitions should be immediate (150ms) to feel responsive.
*   **Patient Metric Readouts:** Use the Data-Display (Monospaced) typography. Values should be 200% larger than their corresponding labels.
*   **Status Indicators:** Small, pulsating circular dots using the Primary, Secondary, or Tertiary colors to indicate live monitoring status.
*   **Input Fields:** Deep black background with 1px gray-800 borders, transitioning to a glow of the Primary color on focus.