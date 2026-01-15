import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import globals from "globals";

export default tseslint.config(
  // 1. Globally Ignore these folders
  { ignores: ["node_modules", "dist", "playwright-report", "test-results"] },

  // 2. Base JavaScript Rules (Recommended)
  js.configs.recommended,

  // 3. Base TypeScript Rules (Recommended)
  ...tseslint.configs.recommended,

  // 4. Configuration for All Files (src and tests)
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-console": "warn",
    }
  },

  // 5. Playwright Specific Rules (Only for files in 'tests' folder)
  {
    files: ["tests/**/*.{ts,js}"],
    ...playwright.configs["flat/recommended"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/no-skipped-test": "warn",
      "playwright/no-focused-test": "error",
    },
  }
);