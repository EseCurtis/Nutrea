const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        '946-latin': ['946Latin'],
        'sf-pro-black': ['SF-Pro-Display-Black'],
        'sf-pro-black-italic': ['SF-Pro-Display-BlackItalic'],
        'sf-pro-bold': ['SF-Pro-Display-Bold'],
        'sf-pro-bold-italic': ['SF-Pro-Display-BoldItalic'],
        'sf-pro-heavy': ['SF-Pro-Display-Heavy'],
        'sf-pro-heavy-italic': ['SF-Pro-Display-HeavyItalic'],
        'sf-pro-light': ['SF-Pro-Display-Light'],
        'sf-pro-light-italic': ['SF-Pro-Display-LightItalic'],
        'sf-pro-medium': ['SF-Pro-Display-Medium'],
        'sf-pro-medium-italic': ['SF-Pro-Display-MediumItalic'],
        'sf-pro-regular': ['SF-Pro-Display-Regular'],
        'sf-pro-regular-italic': ['SF-Pro-Display-RegularItalic'],
        'sf-pro-semibold': ['SF-Pro-Display-Semibold'],
        'sf-pro-semibold-italic': ['SF-Pro-Display-SemiboldItalic'],
        'sf-pro-thin': ['SF-Pro-Display-Thin'],
        'sf-pro-thin-italic': ['SF-Pro-Display-ThinItalic'],

        // 'sf-pro-black': ['sf-pro-black'],
        // 'sf-pro-black-italic': ['sf-pro-black-italic'],
        // 'sf-pro-bold': ['sf-pro-bold'],
        // 'sf-pro-bold-italic': ['sf-pro-bold-italic'],
        // 'sf-pro-heavy': ['sf-pro-heavy'],
        // 'sf-pro-heavy-italic': ['sf-pro-heavy-italic'],
        // 'sf-pro-light': ['sf-pro-light'],
        // 'sf-pro-light-italic': ['sf-pro-light-italic'],
        // 'sf-pro-medium': ['sf-pro-medium'],
        // 'sf-pro-medium-italic': ['sf-pro-medium-italic'],
        // 'sf-pro-regular': ['sf-pro-regular'],
        // 'sf-pro-regular-italic': ['sf-pro-regular-italic'],
        // 'sf-pro-semibold': ['sf-pro-semibold'],
        // 'sf-pro-semibold-italic': ['sf-pro-semibold-italic'],
        // 'sf-pro-thin': ['sf-pro-thin'],
        // 'sf-pro-thin-italic': ['sf-pro-thin-italic'],
      },
      colors,
    },
  },
  plugins: [],
};
