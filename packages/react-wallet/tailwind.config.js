module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: ['bg-green-600'],
};
