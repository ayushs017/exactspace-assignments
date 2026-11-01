/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slack: {
          bg: "#F8F9FA",
          sidebar: "#FFFFFF",
          hover: "#F1F5F9",
          active: "#3B82F6",
          border: "#E2E8F0",
          text: "#1E293B",
          subtext: "#64748B",
        },
      },
    },
  },
  plugins: [],
}
