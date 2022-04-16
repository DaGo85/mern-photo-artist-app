module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        a: "#ECB365",
        b: "#1D1D1F",
        c: "#064663",
        d: "#1D1D1F",
        sselect: "#15B7B9",
        ssuccess: "#45EBA5",
        serror: "#F57170",
        shover: "#F0FFF3",
        linkhover: "#06c",
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
