import defaultConfig from "./config";
import type ConfigType from "./ConfigType";

// Define the CONFIG object with a placeholder for now
const CONFIG: ConfigType = {
  ...defaultConfig,
// The environmentConfig will be spread here later
};

// Create an async function to load the environment-specific configuration
async function loadEnvironmentConfig() {
  // get all env config modules
  const configModules = import.meta.glob("./*.config.ts");

  // path to the target env config
  const envConfigPath = `./${import.meta.env.MODE}.config.ts`;

  if (envConfigPath in configModules) {
    // load config from the target env config
    const loadEnvironmentConfig = configModules[envConfigPath];
    const environmentConfig: Partial<ConfigType> = ((await loadEnvironmentConfig()) as any).default;

    // Override default config with specific environment config
    Object.assign(CONFIG, environmentConfig);
  }
}

// Call the function to load the configuration
loadEnvironmentConfig();

// Export the ConfigType and CONFIG (which will be populated asynchronously)
export { ConfigType };
export default CONFIG;
