import eslint from "@eslint/js";
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
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
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
      "linebreak-style": [
        "warn",
        "windows",
      ],
      "no-multiple-empty-lines": [
        "warn",
        {
          "max": 1,
          "maxBOF": 0,
          "maxEOF": 0,
        },
      ],
      "no-multi-spaces": "warn",
      "no-trailing-spaces": "warn",
      "array-bracket-spacing": [
        "warn",
        "never",
      ],
      "space-in-parens": [
        "warn",
        "never",
      ],
      "arrow-spacing": [
        "warn",
        {
          "before": true,
          "after": true,
        },
      ],
      "semi": [
        "warn",
        "always",
      ],
      // "@typescript-eslint/semi": [
      //   "warn",
      //   "always",
      // ],
      "object-curly-spacing": [
        "warn",
        "always",
      ],
      // "@typescript-eslint/object-curly-spacing": [
      //   "warn",
      //   "always"
      // ],
      "comma-spacing": [
        "warn",
        {
          "before": false,
          "after": true,
        },
      ],
      // "@typescript-eslint/comma-spacing": [
      //   "warn",
      //   {
      //     "before": false,
      //     "after": true
      //   }
      // ],
      "space-infix-ops": "warn",
      // "@typescript-eslint/space-infix-ops": "warn",
      "space-before-function-paren": [
        "warn",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always",
        },
      ],
      // "@typescript-eslint/space-before-function-paren": [
      //   "warn",
      //   {
      //     "anonymous": "always",
      //     "named": "never",
      //     "asyncArrow": "always"
      //   },
      // ],
      "space-before-blocks": "warn",
      // "@typescript-eslint/space-before-blocks": "warn",
      "indent": [
        "warn",
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
      // "@typescript-eslint/indent": [
      //   "off",
      //   2,
      //   {
      //     "SwitchCase": 1,
      //     "VariableDeclarator": {
      //       "var": 2,
      //       "let": 2,
      //       "const": 3
      //     }
      //   }
      // ],
      "quotes": [
        "warn",
        "double",
      ],
      // "@typescript-eslint/quotes": [
      //   "warn",
      //   "double"
      // ],
      "comma-dangle": [
        "warn",
        {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "always-multiline",
          "exports": "only-multiline",
          "functions": "only-multiline",
        },
      ],
      // "@typescript-eslint/comma-dangle": [
      //   "warn",
      //   {
      //     "arrays": "always-multiline",
      //     "objects": "always-multiline",
      //     "imports": "always-multiline",
      //     "exports": "only-multiline",
      //     "functions": "only-multiline",
      //     "enums": "only-multiline",
      //     "generics": "ignore",
      //     "tuples": "only-multiline"
      //   }
      // ],
      "padding-line-between-statements": [
        "warn",
        {
          "blankLine": "always",
          "prev": "*",
          "next": [
            "return",
            // "interface",
            // "type",
          ],
        },
      ],
      // "@typescript-eslint/padding-line-between-statements": [
      //   "warn",
      //   {
      //     "blankLine": "always",
      //     "prev": "*",
      //     "next": [
      //       "return",
      //       "interface",
      //       "type"
      //     ]
      //   }
      // ],
      "keyword-spacing": [
        "warn",
        {
          "before": true,
          "after": true,
        },
      ],
      // "@typescript-eslint/keyword-spacing": [
      //   "warn",
      //   {
      //     "before": true,
      //     "after": true
      //   }
      // ],
      "brace-style": [
        "warn",
        "1tbs",
        {
          "allowSingleLine": false,
        },
      ],
      // "@typescript-eslint/brace-style": [
      //   "warn",
      //   "1tbs",
      //   {
      //     "allowSingleLine": false
      //   }
      // ],
      // "@typescript-eslint/type-annotation-spacing": "warn",
      // "@typescript-eslint/member-delimiter-style": [
      //   "warn",
      //   {
      //     "multiline": {
      //       "delimiter": "semi",
      //       "requireLast": true
      //     },
      //     "singleline": {
      //       "delimiter": "semi",
      //       "requireLast": true
      //     }
      //   }
      // ],
      "jsx-quotes": [
        "warn",
        "prefer-double",
      ],
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          "additionalHooks": "useUpdateEffect",
        },
      ],
      "react/jsx-tag-spacing": [
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
      "react/jsx-curly-brace-presence": [
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
