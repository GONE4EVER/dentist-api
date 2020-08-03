const production = process.env.NODE_ENV === "production";


module.exports = {
  extends: ["airbnb-base"],
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "array-bracket-spacing": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": ["error", { max: 2 }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "linebreak-style": ["error", "unix"],
    "no-console": production ? "warn" : "off",
    "no-debugger": production ? "warn" : "off",
    "no-multiple-empty-lines": ["error", { max: 2 }],
  },
};
