import { config } from "dotenv";
import { execSync } from "child_process";

// Load test environment variables
config({ path: ".env.test" });

// Run drizzle-kit push
execSync("drizzle-kit push", { stdio: "inherit" });
