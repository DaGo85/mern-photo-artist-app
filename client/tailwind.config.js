module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        a: "#D4ECDD",
        b: "#345B63",
        c: "#152D35",
        d: "#112031",
      },
      keyframes: {
        sliderImage: {
          "0%": { objectPosition: "center center" },
          "25%": { objectPosition: "right top" },
          "70%": { objectPosition: "left bottom" },
          "100%": { objectPosition: "center center" },
        },
        buttonPulse: {
          "0%": { color: "rgb(241 245 249)" },
          "50%": { color: "#112031" },
          "100%": { color: "rgb(241 245 249)" },
        },
      },
      animation: {
        buttonPulse: "buttonPulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        sliderImage: "sliderImage 30s linear infinite",
      },
    },
  },
  plugins: [],
};
