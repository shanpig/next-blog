module.exports = {
  content: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
    'node_modules/@material-tailwind/**/*.{js, jsx, ts, tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@material-tailwind/react'),
  ],
};
