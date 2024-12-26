/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      boxShadow: {
        card: '0 1px 8px 0 rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 3px 3px -2px rgba(0,0,0,.12)'
      },
      backgroundImage: {
        'table-t': 'white',
        'table-b':
          'radial-gradient(ellipse at bottom, rgba(0,128,255,0.2) 0%, transparent)'
      }
    },
    container: {
      center: true
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
