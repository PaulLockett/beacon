module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "next",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import",
    "unused-imports",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: ["apps/*/tsconfig.json"],
      },
    },
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "import/default": "off",
    "import/export": "warn",
    "import/namespace": "off",
    "import/newline-after-import": "warn",
    "import/no-absolute-path": "warn",
    "import/no-duplicates": "error",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": ["error", { ignore: ["hast", "mdast", "unist"] }],
    "import/no-unused-modules": "warn",
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "unknown",
        ],
        "newlines-between": "never",
        pathGroups: [
          {
            group: "unknown",
            pattern: "*.css",
            patternOptions: {
              matchBase: true,
            },
            position: "after",
          },
        ],
      },
    ],

    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "off",
  },
};
