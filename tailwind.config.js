module.exports = {
  purge: [
    './public/**/*.html',
    './stories/**/*.{js,jsx,ts,tsx,vue}',
    './packages/*/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [
    './public/**/*.html',
    './stories/**/*.{js,jsx,ts,tsx,vue}',
    './packages/*/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [],
};
