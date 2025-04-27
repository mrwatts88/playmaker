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
      statements: 97,
      branches: 90,
      functions: 100,
      lines: 97,
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
