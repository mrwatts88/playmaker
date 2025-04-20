/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  coverageThreshold: {
    global: {
      statements: 99,
      branches: 97,
      functions: 100,
      lines: 99,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "db/schema/schema.ts", "db/db.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testEnvironmentOptions: {
    jest: true,
  },
  maxWorkers: 1,
};

module.exports = config;
