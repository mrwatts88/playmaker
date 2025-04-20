/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  coveragePathIgnorePatterns: ["/node_modules/", "db/schema/schema.ts", "db/db.ts"],
};

module.exports = config;
