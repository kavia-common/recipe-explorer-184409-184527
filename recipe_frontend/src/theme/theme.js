/**
 * PUBLIC_INTERFACE
 * theme: Centralized theme tokens for Ocean Professional styling.
 * Provides colors, radii, spacing, and text styles for use across components.
 */
export const theme = {
  name: 'Ocean Professional',
  // Colors
  primary: 0x2563EBff,   // Blue
  secondary: 0xF59E0Bff, // Amber
  error: 0xEF4444ff,
  text: 0x111827ff,
  backgroundColor: 0xf9fafbff,
  surface: 0xffffffff,

  // Gradient accents (use subtle overlays)
  gradientFrom: 0x3b82f610, // approx blue-500/10 in ARGB 0xAARRGGBB (16 hex alpha)
  gradientTo: 0xf3f4f6ff,   // gray-100

  // Radii and elevations
  radius: 16,
  cardElevation: 0.15, // alpha for shadow-like overlays

  // Sizes
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  },

  // Typography helpers for Lightning Text
  // Lightning text uses size, fontFace, textColor
  textStyles: {
    heading: { size: 48, textColor: 0x111827ff },
    subheading: { size: 32, textColor: 0x111827ff },
    body: { size: 26, textColor: 0x111827ff },
    caption: { size: 22, textColor: 0x374151ff }
  }
}

/**
 * PUBLIC_INTERFACE
 * focusRing: returns visual properties used to render focus accents for keyboard/remote nav
 */
export function focusRing(active = true) {
  return active
    ? { color: theme.secondary, alpha: 0.35 }
    : { color: theme.surface, alpha: 0 }
}
