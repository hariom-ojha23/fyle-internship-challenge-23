/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    borderColor: theme => ({
      ...theme('colors'),
      'primary-pink': '#c2185b',
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary-pink': '#c2185b',
    })
  },
  plugins: [],
}

