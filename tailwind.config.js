/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sourcecodepro: ['"Source Code Pro"', "monospace"],
      },
    },
    fontFamily: {
      helvetica: ["helvetica", "sans"],
      SuisseIntlRegular: ["SuisseIntlRegular", "sans"],
      AvenirHeavy: ["AvenirHeavy", "sans"],
    },
  },
  plugins: [],
  variants: ["responsive", "hover", "focus", "active", "group-hover"],
};
