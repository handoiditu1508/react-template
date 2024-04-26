import defaultConfig from "./config";
import type ConfigType from "./ConfigType";

const environmentConfig: ConfigType | Partial<ConfigType> = require(`./${import.meta.env.MODE}.config`).default;

const CONFIG: ConfigType = {
  ...defaultConfig,
  ...environmentConfig,
};

export { ConfigType };
export default CONFIG;
