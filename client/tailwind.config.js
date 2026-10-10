/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ink: '#17212b',
        canvas: '#f3f5f7',
        brand: {
          50: '#e8f4f7',
          100: '#cde8ee',
          500: '#12809c',
          600: '#0d6a83',
          700: '#0a566b',
        },
      },
    },
  },
  plugins: [],
};
