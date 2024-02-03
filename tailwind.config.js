/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#0B264B",
        "primary-blue": "#15CADF",
        "primary-gray" : "rgba(21, 202, 223, 0.04)",
        "primary-border" : "rgba(21, 202, 223, 0.10)"
      },
      backgroundImage: {
        left: "url('/images/left-bg.png')",
        right: "url('/images/right-bg.png')",
      },
      backgroundColor: {
        "custom-blue": "rgba(21, 202, 223, 0.04)",
      },
    },
  },
  plugins: [],
};
