/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // -------- PALETA OFICIAL SCULPT SOCIETY --------
        // Mismos tokens que sculptsocietycr.com — orange, wine, pink,
        // cream, charcoal, gold.
        orange: '#E7552C',
        wine: '#811D16',
        pink: '#F4BABB',
        cream: '#F9F5ED',
        charcoal: '#373330',
        gold: '#D6C774',

        // Helpers brand-aligned (tints suaves)
        candy: '#FBE2E3',  // pink muy claro
        blush: '#ED8889',  // pink saturado
        sand:  '#EFE7D0',  // cream warm

        // Alias para compatibilidad / claridad semántica
        ink: '#373330',
      },
      fontFamily: {
        // Mismas fuentes que la landing principal
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Poppins', 'serif'],
      },
      maxWidth: {
        site: '480px',  // mobile-first
      },
      letterSpacing: {
        wider2: '0.18em',
        wider3: '0.3em',
        tightest: '-0.04em',
      },
      backgroundImage: {
        // Gradients brand de la landing
        'gradient-y2k':    'linear-gradient(135deg, #F9F5ED 0%, #FBE2E3 45%, #F4BABB 75%, #EFE7D0 100%)',
        'gradient-hannah': 'linear-gradient(160deg, #FBE2E3 0%, #F4BABB 100%)',
        'gradient-miley':  'linear-gradient(160deg, #811D16 0%, #E7552C 100%)',
        // Acabado satinado para la capa scratch
        'scratch-foil':    'linear-gradient(135deg, #D6C774 0%, #EFE7D0 30%, #D6C774 55%, #B59E4A 80%, #D6C774 100%)',
      },
      boxShadow: {
        card: '0 8px 30px rgba(129, 29, 22, 0.10)',
        cardHover: '0 12px 40px rgba(129, 29, 22, 0.18)',
        scratch: '0 8px 30px rgba(129, 29, 22, 0.18)',
      },
    },
  },
  plugins: [],
};
