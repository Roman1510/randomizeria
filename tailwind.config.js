export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        glow: 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(167, 139, 250, 0.5)',
        'glow-md': '0 0 15px rgba(167, 139, 250, 0.7)',
      },
    },
  },
  plugins: [],
}
