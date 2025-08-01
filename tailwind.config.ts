import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        "sparkle-pop": { // NEW KEYFRAME
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "pulse-slow": { // NEW KEYFRAME
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 20px rgba(129, 140, 248, 0.6)",
          },
        },
        "float-up-fade-out": { // NEW KEYFRAME
          "0%": {
            opacity: "1",
            transform: "translate(-50%, -50%) translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -50%) translateY(-50px)",
          },
        },
        "particle-burst": { // NEW KEYFRAME
          "0%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0) translateY(-30px)",
          },
        },
        "bounce-once": { // NEW KEYFRAME
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "20%": {
            transform: "translateY(-5px)",
          },
          "40%": {
            transform: "translateY(0)",
          },
        },
        "pulse-rainbow": { // NEW KEYFRAME
          "0%, 100%": {
            "background-position": "0% 50%",
            "box-shadow": "0 0 10px rgba(0,0,0,0.3)",
          },
          "25%": {
            "background-position": "50% 50%",
            "box-shadow": "0 0 20px rgba(255, 165, 0, 0.6)",
          },
          "50%": {
            "background-position": "100% 50%",
            "transform": "scale(1.05)",
            "box-shadow": "0 0 30px rgba(0, 255, 0, 0.8)",
          },
          "75%": {
            "background-position": "50% 50%",
            "box-shadow": "0 0 20px rgba(0, 0, 255, 0.6)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "sparkle-pop": "sparkle-pop 0.5s ease-out", // NEW ANIMATION
        "pulse-slow": "pulse-slow 2s infinite ease-in-out", // NEW ANIMATION
        "float-up-fade-out": "float-up-fade-out 0.8s ease-out forwards", // NEW ANIMATION
        "particle-burst": "particle-burst 0.8s ease-out forwards", // NEW ANIMATION
        "bounce-once": "bounce-once 0.6s ease-out", // NEW ANIMATION
        "pulse-rainbow": "pulse-rainbow 4s ease infinite", // NEW ANIMATION
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;