import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
import Typography from "./theme/__Theme.Typography";
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        primary: "rgba(var(--primary))",
        secondary: "hsl(var(--secondary))",
        success: "rgba(var(--success))",
        error: "rgba(var(--error))",
        warning: "rgba(var(--warning))",
        border: "rgba(var(--border))",
        card: "hsl(var(--card))",
        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rgba(var(--secondary-text))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",
        grape: "rgba(var(--grape))",
        "--success-bg": "rgba(var(--success-bg))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
      },
      typography: {
        DEFAULT: {
          css: Typography,
        },
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glass-hover": "0 8px 32px rgba(0, 0, 0, 0.12)",
        button: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "button-hover": "0 4px 8px rgba(0, 0, 0, 0.12)",
        "custom-blue": "0px 34px 80px rgba(46, 52, 121, 0.12)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },

  plugins: [typographyPlugin],
  safelist: [
    "bg-[#BBF7D0]/30",
    "hover:bg-[#BBF7D0]/50",
    "text-[#16a34a]",
    "bg-[#BFDBFE]/30",
    "hover:bg-[#BFDBFE]/50",
    "text-[#2563EB]",
    "bg-purple-300",
    "hover:bg-purple-400",
    "text-purple-800",
    "bg-primary/30",
    "hover:bg-primary/50",
    "text-primary",
    "bg-[#FEF08A]/30",
    "hover:bg-[#FEF08A]/50",
    "text-[#CA8A04]",
    "bg-white",
  ],
} as Config;
