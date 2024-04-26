import defaultConfig from "./config";
import type ConfigType from "./ConfigType";

const environmentConfig: Partial<ConfigType> = (await import(`./${import.meta.env.MODE}.config.ts`)).default;

const CONFIG: ConfigType = {
  ...defaultConfig,
  ...environmentConfig,
};

export { ConfigType };
export default CONFIG;
