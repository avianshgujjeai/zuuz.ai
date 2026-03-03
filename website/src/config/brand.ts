/**
 * Brand token file — single source of truth for ZUUZ brand values.
 * Update these when the branding guide arrives.
 * CSS variables in globals.css should match these values.
 */

export const brand = {
  primary: "#0018FF",
  primaryRgb: "0 24 255",
  primaryHover: "#0014D9",
  primaryHoverRgb: "0 20 217",
  primaryForeground: "#FFFFFF",

  radius: {
    button: "0.75rem",
    card: "1rem",
    input: "0.75rem",
    pill: "9999px",
  },

  shadow: {
    button: "var(--shadow-soft)",
    buttonHover: "var(--shadow-md)",
    card: "var(--shadow-xs)",
    cardHover: "var(--shadow-md)",
    elevated: "var(--shadow-elevated)",
  },
} as const;
