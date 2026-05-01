/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#E7552C',
        wine: '#811D16',
        pink: '#F4BABB',
        cream: '#F9F5ED',
        charcoal: '#373330',
        gold: '#D6C774',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1280px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
