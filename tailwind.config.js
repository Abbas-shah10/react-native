import nativewindPreset from "nativewind/preset";

/** @type {import('tailwindcss').Config} */
export default {
  // Add the paths to all of your component files
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
