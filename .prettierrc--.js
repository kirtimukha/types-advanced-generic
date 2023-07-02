module.exports = {
  useEditorConfig: false,
  printWidth: 160,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  trailingComma: "all",
  bracketSpacing: true,
  bracketLine: true,
  // bracketSameLine: true,
  arrowParens: "always",
  vueIndentScriptAndStyle: true,
  endOfLine: "auto",
  jsxSingleQuote: true,
  singleQuote: true,
  proseWrap: "preserve",
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
};
