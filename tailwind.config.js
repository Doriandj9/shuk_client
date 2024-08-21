/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';
import { app } from './src/config/app';

export default {
  content: ['./src/**/*.{jsx,js,tsx}', './src/modules/**/*.{jsx,js,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...app.colors
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
};