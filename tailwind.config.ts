import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "text-gradient":
          "linear-gradient(to bottom, var(--foreground-rgb), rgba(255, 0, 0, 0))",
      },
      colors: {
        foreground: "rgb(var(--foreground-rgb))",
        background: "rgb(var(--background-rgb))",
        "background-start": "rgb(var(--background-start-rgb))",
        "background-end": "rgb(var(--background-end-rgb))",
        "tab-bg": "var(--tab-bg-color)",
        "tab-text": "var(--tab-text-color)",
        "logo-bg": "var(--logo-bg)",
        "bubble-primary": "var(--bubble-primary-color)",
        "home-primary": "var(--home-primary-color)",
        "my-primary": "var(--my-primary-color)",
        // shadcn/ui
        // --------------------------------
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        // --------------------------------
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow1": "bounce 3s linear infinite",
        "bounce-slow2": "bounce 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
