/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#FFAC33",

          "secondary": "#A0AB32",

          "accent": "#4C9B56",

          "neutral": "#241f33",

          "base-100": "#fcfcfd",

          "info": "#2F4858",

          "success": "#37e1cd",

          "warning": "#f2b764",

          "error": "#ee463a",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

