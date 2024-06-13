type ConfigType = {
  APP_NAME: string;
  IS_AWESOME: boolean;
  /**
   * theme.spacing(CONFIG.LAYOUT_PADDING)
   */
  LAYOUT_PADDING: number;
  EMPTY_FUNCTION: () => void;
  EMPTY_OBJECT: {};
  EMPTY_ARRAY: [];
  CLIENT_ID: string;
  CLIENT_SECRET: string;
};

export default ConfigType;
