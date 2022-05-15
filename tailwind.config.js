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
      },
      animation: {
        shake: 'shake 1.2s ease-in-out',
      },
      width: {
        128: '32rem',
      },
      minHeight: {
        4: '1rem',
      },
    },
  },
  plugins: [],
}
