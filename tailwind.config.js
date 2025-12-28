/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",

    // Root folders
    "./src/**/*.{js,jsx,ts,tsx}",
    "./login/**/*.{js,jsx,ts,tsx}",

    // Custom folders in your project
    "./DynamicFormRendering/**/*.{js,jsx,ts,tsx}",
    "./SolarUnitForm/**/*.{js,jsx,ts,tsx}",
    "./OtherForm/**/*.{js,jsx,ts,tsx}",
    "./redux/**/*.{js,jsx,ts,tsx}",
    "./config/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {},
  },

  plugins: [],
};
