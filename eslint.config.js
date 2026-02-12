import eslint from "@eslint/js";
import json from "@eslint/json";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({ plugins: { prettier, json } }, eslint.configs.recommended, tseslint.configs.recommended, {
    rules: {
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-declaration-merging": "off",
        "@typescript-eslint/no-unsafe-function-type": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                args: "all",
                argsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            },
        ],
        "@typescript-eslint/no-wrapper-object-types": "off",
        "no-unused-private-class-members": "off",
    },
});
