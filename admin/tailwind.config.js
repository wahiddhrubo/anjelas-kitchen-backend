/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontSize: {
      "heading-lg": [
        "52px",
        {
          lineHeight: "1.25",
          fontWeight: "bold",
        },
      ],
      "body-lg": [
        "22px",
        {
          lineHeight: "30px",
          fontWeight: "semibold",
        },
      ],
      "body-md": [
        "18px",
        {
          lineHeight: "30px",
          fontWeight: "semibold",
        },
      ],
      "highlight-lg": [
        "24px",
        {
          lineHeight: "30px",
          fontWeight: "bold",
        },
      ],
    },
    fontFamily: {
      gilroy: "Gilroy",
    },
    extend: {
      colors: {
        primary: "#FE7502",
        "primary-text": "#444444",
        "secondary-text": "#75797F",
      },
    },
  },
  plugins: [],
};
