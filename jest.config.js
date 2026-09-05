const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^remark-math$": "<rootDir>/src/__mocks__/remark-math.js",
    "^rehype-katex$": "<rootDir>/src/__mocks__/rehype-katex.js",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "src/__tests__/utils/"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!(react-markdown|rehype-highlight|remark-gfm|remark-math|rehype-katex|vfile|vfile-message|unified|bail|is-plain-obj|trough|unist-util-stringify-position|micromark|decode-named-character-reference|character-entities|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|pretty-bytes|ccount|mdast-util-to-hast|zwitch|html-void-elements|trim-lines|@lobehub)/)",
  ],
};

module.exports = createJestConfig(customJestConfig);
