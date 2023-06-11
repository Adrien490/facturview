import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#00A8CC',
        'secondary': '#27496D',
        "contrast":'#142850',
        "background":'white'
      },
      
    },
  },
  plugins: [],
} satisfies Config;
