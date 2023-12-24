/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      'green': '#68da3e',
      'blue': '#00c6ab',
      'primary': '#6aa3b4',
      'secondary': '#416864',
      'tertiary': '#223026',
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
