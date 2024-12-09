import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        instrument: ["var(--font-instrument)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          "00": "rgb(var(--gray-00))",
          "25": "rgb(var(--gray-25))",
          "50": "rgb(var(--gray-50))",
          "100": "rgb(var(--gray-100))",
          "200": "rgb(var(--gray-200))",
          "300": "rgb(var(--gray-300))",
          "400": "rgb(var(--gray-400))",
          "500": "rgb(var(--gray-500))",
          "600": "rgb(var(--gray-600))",
          "700": "rgb(var(--gray-700))",
          "800": "rgb(var(--gray-800))",
          "900": "rgb(var(--gray-900))",
          "1k": "rgb(var(--gray-1k))",
        },
        red: {
          "00": "rgb(var(--red-00))",
          "300": "rgb(var(--red-300))",
        },
        green: {
          "300": "rgb(var(--green-300))",
          "400": "rgb(var(--green-400))",
          "500": "rgb(var(--green-500))",
        },
        primaryBorder: "rgb(var(--border))",
      },
      boxShadow: {
        "5": "var(--shadow-5)",
        "10": "var(--shadow-10)",
        "15": "var(--shadow-15)",
        focus: "var(--shadow-focus)",
      },
    },
  },
  plugins: [],
} satisfies Config;
