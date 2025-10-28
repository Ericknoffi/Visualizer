/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // all files inside app folder (and subfolders)
    "./page.js",                   // root-level page.js
    "./layout.js",                 // root-level layout.js (if any)
    "./public/**/*.html",          // just in case you have any static HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
