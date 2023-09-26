module.exports = {
  singleQuote: true,
  endOfLine: "crlf",
  tailwindConfig: "./tailwind.config.js",
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
  ],
};

