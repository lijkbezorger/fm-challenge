// @ts-check
const jsEsLint = require("@eslint/js");
const tsEslint = require("typescript-eslint");
const angularEslint = require("angular-eslint");
const pluginImports = require("eslint-plugin-import");

module.exports = tsEslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      jsEsLint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angularEslint.configs.tsRecommended,
    ],
    processor: angularEslint.processInlineTemplates,
    plugins: {
      import: pluginImports,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            { pattern: "@angular/**", group: "external", position: "before" },
            { pattern: "rxjs", group: "external", position: "before" },
            { pattern: "rxjs/**", group: "external", position: "before" },
            { pattern: "@ngx-translate/**", group: "external", position: "before" },
            { pattern: "@ngneat/**", group: "external", position: "before" },
            { pattern: "@providers/**", group: "internal" },
            { pattern: "@services/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["internal"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angularEslint.configs.templateRecommended,
      ...angularEslint.configs.templateAccessibility,
    ],
    rules: {},
  }
);
