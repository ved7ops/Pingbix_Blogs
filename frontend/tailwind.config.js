/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'toggle-switch': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(24px)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'toggle-switch': 'toggle-switch 0.2s ease-out'
      },
      typography: {
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              'scroll-margin-top': '100px',
            },
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
            strong: {
              fontWeight: '600',
            },
            hr: {
              borderColor: 'var(--tw-prose-hr)',
              marginTop: '3em',
              marginBottom: '3em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};