module.exports = {
  singleQuote: false,
  endOfLine: "crlf",
  tailwindConfig: "./tailwind.config.js",
  plugins: [require("prettier-plugin-tailwindcss")],
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
  ],
};
