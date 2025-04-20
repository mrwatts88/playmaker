require("dotenv").config({ path: ".env.test" });

const originalConsole = { ...console };

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});
