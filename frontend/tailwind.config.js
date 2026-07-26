/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5E3AAE',
          dark: '#452A82',
          light: '#7C5AC4',
        },
        secondary: '#234B8C',
        accent: '#1ABC9C',
        success: '#2ECC71',
        warning: '#F39C12',
        danger: '#E74C3C',
        surface: '#F6F8FC',
        border: '#E5E7EB',
        textDark: '#1F2937',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(180deg, #5E3AAE 0%, #234B8C 100%)',
        'button-gradient': 'linear-gradient(90deg, #5E3AAE 0%, #7C5AC4 100%)',
      },
    },
  },
  plugins: [],
};