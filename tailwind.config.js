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
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
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
        'slide-in': {
          '0%': {
            transform: 'translateX(-1500px) skewX(30deg) scaleX(1.3)',
          },
          '70%': {
            transform: 'translateX(30px) skewX(0deg) scaleX(.9)',
          },
          '100%': {
            transform: 'translateX(0px) skewX(0deg) scaleX(1)',
          },
        },
        'slide-out': {
          '0%': {
            transform: 'translateX(0px) skewX(0deg) scaleX(1)',
          },
          '30%': {
            transform: 'translateX(-30px) skewX(-5deg) scaleX(.9)',
          },
          '100%': {
            transform: 'translateX(1500px) skewX(30deg) scaleX(1.3)',
          },
        },
      },
      animation: {
        shake: 'shake 1.2s ease-in-out',
        'fade-in': 'fade-in .3s linear',
        'fade-out': 'fade-out .3s linear',
        'rotate-x': 'rotate-x .4s ease-in-out forwards',
        scale: 'scale .3s ease-in-out',
        'scale-down': 'scale-down .2s ease-in-out',
        'slide-in':
          'slide-in .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'slide-out':
          'slide-out .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
      },
      width: {
        128: '32rem',
        256: '64rem',
      },
      minHeight: {
        4: '1rem',
      },
      height: {
        15: '3.75rem',
        128: '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
