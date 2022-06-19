module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '55%': { transform: 'translateX(0)' },
          '60%': { transform: 'translateX(20px)' },
          '65%': { transform: 'translateX(-20px)' },
          '70%': { transform: 'translateX(15px)' },
          '75%': { transform: 'translateX(-15px)' },
          '80%': { transform: 'translateX(10px)' },
          '85%': { transform: 'translateX(-10px)' },
          '90%': { transform: 'translateX(5px)' },
          '95%': { transform: 'translateX(-5px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'skewX(53deg) translateX(-500px)', opacity: '0' },
          '60%': { transform: 'translateX(0px)' },
          '62%': { transform: 'skewX(0deg) translateX(30px)' },
          '70%': { transform: 'skewX(-20deg)', opacity: '1' },
          '80%': { transform: 'skewX(0deg) translate(0)' },
          '90%': { transform: 'skewX(-5deg)' },
          '100%': { transform: 'skewX(0deg)' },
        },
        'rotate-x': {
          '0%': {
            transform: 'rotateX(-90deg)',
          },
          '70%': {
            transform: 'rotateX(20deg)',
          },
          '100%': {
            transform: 'rotateX(0deg)',
          },
        },
        scale: {
          '0%': {
            transform: 'scale(0)',
          },
          '50%': {
            transform: 'scale(2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'scale-down': {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0)',
          },
        },
      },
      animation: {
        shake: 'shake 1.2s ease-in-out',
        'fade-out': 'fade-out .3s linear',
        'slide-in': 'slide-in .7s ease-in',
        'rotate-x': 'rotate-x .4s ease-in-out forwards',
        scale: 'scale .3s ease-in-out',
        'scale-down': 'scale-down .2s ease-in-out',
      },
      width: {
        128: '32rem',
      },
      minHeight: {
        4: '1rem',
      },
      height: {
        15: '3.75rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
