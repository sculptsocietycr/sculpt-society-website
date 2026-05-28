/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // -------- PALETA OFICIAL SCULPT SOCIETY --------
        orange: '#E7552C',
        wine: '#811D16',
        pink: '#F4BABB',
        cream: '#F9F5ED',
        charcoal: '#373330',
        gold: '#D6C774',

        // -------- HELPERS BRAND-ALIGNED (tints) --------
        candy: '#FBE2E3',  // pink muy suave (lavado del brand pink)
        blush: '#ED8889',  // pink saturado (entre brand pink y orange)
        sand:  '#EFE7D0',  // cream warm (cream + leve gold)

        // -------- ALIAS DE CLASES Y2K → BRAND --------
        // Mantienen las clases que ya están en uso pero compilan a brand.
        bubblegum: '#ED8889', // hot pink brand-aligned
        lilac:     '#EFE7D0', // sand suave (en vez de morado)
        violet:    '#811D16', // alias de wine
        denim:     '#811D16', // alias de wine
        chrome:    '#F9F5ED', // alias de cream
        silver:    '#D6C774', // alias de gold
        sky:       '#FBE2E3', // alias de candy
        offwhite:  '#F9F5ED', // alias de cream
        ink:       '#373330', // alias de charcoal
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Poppins', 'serif'],
        script: ['"Caveat"', 'cursive'],
      },
      maxWidth: {
        site: '1280px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      backgroundImage: {
        // Y2K-on-brand: cream / candy / pink / gold
        'gradient-y2k':    'linear-gradient(135deg, #F9F5ED 0%, #FBE2E3 45%, #F4BABB 75%, #EFE7D0 100%)',
        'gradient-hannah': 'linear-gradient(160deg, #FBE2E3 0%, #F4BABB 100%)',
        'gradient-miley':  'linear-gradient(160deg, #811D16 0%, #E7552C 100%)',
        'gradient-chrome': 'linear-gradient(135deg, #F9F5ED 0%, #FBE2E3 50%, #D6C774 100%)',
      },
    },
  },
  plugins: [],
};
