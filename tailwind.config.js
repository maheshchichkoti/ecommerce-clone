module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths based on your project structure
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Disable preflight if it interferes with external libraries like FontAwesome
  },
  plugins: [],
};
