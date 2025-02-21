// import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      // eslint.configs.recommended,
      // ...tseslint.configs.recommended,
    ],
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      "import": importPlugin,
      react,
      "@stylistic": stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          "allowConstantExport": true,
        },
      ],
      "@stylistic/linebreak-style": [
        "warn",
        "windows",
      ],
      "@stylistic/no-multiple-empty-lines": [
        "warn",
        {
          "max": 1,
          "maxBOF": 0,
          "maxEOF": 0,
        },
      ],
      "@stylistic/no-multi-spaces": "warn",
      "@stylistic/no-trailing-spaces": "warn",
      "@stylistic/array-bracket-spacing": [
        "warn",
        "never",
      ],
      "@stylistic/space-in-parens": [
        "warn",
        "never",
      ],
      "@stylistic/arrow-spacing": [
        "warn",
        {
          "before": true,
          "after": true,
        },
      ],
      "@stylistic/semi": [
        "warn",
        "always",
      ],
      "@stylistic/object-curly-spacing": [
        "warn",
        "always",
      ],
      "@stylistic/comma-spacing": [
        "warn",
        {
          "before": false,
          "after": true,
        },
      ],
      "@stylistic/space-infix-ops": "warn",
      "@stylistic/space-before-function-paren": [
        "warn",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always",
        },
      ],
      "@stylistic/space-before-blocks": "warn",
      "@stylistic/indent": [
        "off",
        2,
        {
          "SwitchCase": 1,
          "VariableDeclarator": {
            "var": 2,
            "let": 2,
            "const": 3,
          },
        },
      ],
      "@stylistic/quotes": [
        "warn",
        "double",
      ],
      "@stylistic/comma-dangle": [
        "warn",
        {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "always-multiline",
          "exports": "only-multiline",
          "functions": "only-multiline",
          "enums": "only-multiline",
          "generics": "ignore",
          "tuples": "only-multiline",
        },
      ],
      "@stylistic/padding-line-between-statements": [
        "warn",
        {
          "blankLine": "always",
          "prev": "*",
          "next": [
            "return",
            "interface",
            "type",
          ],
        },
      ],
      "@stylistic/keyword-spacing": [
        "warn",
        {
          "before": true,
          "after": true,
        },
      ],
      "@stylistic/brace-style": [
        "warn",
        "1tbs",
        {
          "allowSingleLine": false,
        },
      ],
      "@stylistic/type-annotation-spacing": "warn",
      "@stylistic/member-delimiter-style": [
        "warn",
        {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true,
          },
          "singleline": {
            "delimiter": "semi",
            "requireLast": true,
          },
        },
      ],
      "@stylistic/jsx-quotes": [
        "warn",
        "prefer-double",
      ],
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          "additionalHooks": "useUpdateEffect",
        },
      ],
      "@stylistic/jsx-tag-spacing": [
        "warn",
        {
          "closingSlash": "never",
          "beforeSelfClosing": "always",
          "afterOpening": "never",
          "beforeClosing": "never",
        },
      ],
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "@stylistic/jsx-curly-brace-presence": [
        "warn",
        {
          "props": "never",
          "children": "never",
          "propElementValues": "always",
        },
      ],
      "react/no-unknown-property": [
        "warn",
        {
          "ignore": [],
        },
      ],
      "react/jsx-no-useless-fragment": [
        "warn",
        {
          "allowExpressions": true,
        },
      ],
      "react/jsx-fragments": "warn",
      "import/newline-after-import": "warn",
    },
  },
);
