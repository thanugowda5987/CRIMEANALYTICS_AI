/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5E3AAE",
          light: "#7B52D6",
          dark: "#432876",
        },
        secondary: {
          DEFAULT: "#234B8C",
          light: "#3566B0",
          dark: "#173562",
        },
        accent: {
          DEFAULT: "#1ABC9C",
        },
        success: "#2ECC71",
        warning: "#F39C12",
        danger: "#E74C3C",
        bgLight: "#F6F8FC",
        borderLight: "#E5E7EB",
        textDark: "#1F2937",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(94, 58, 174, 0.08)",
        card: "0 2px 12px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "sidebar-gradient": "linear-gradient(180deg, #5E3AAE 0%, #234B8C 100%)",
        "button-gradient": "linear-gradient(135deg, #5E3AAE 0%, #234B8C 100%)",
      },
    },
  },
  plugins: [],
};