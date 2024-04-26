type ConfigType = {
  APP_NAME: string;
  IS_AWESOME: boolean;
  /**
   * theme.spacing(CONFIG.LAYOUT_PADDING)
   */
  LAYOUT_PADDING: number;
  EMPTY_FUNCTION: () => void;
  EMPTY_OBJECT: Record<string, never>;
  EMPTY_ARRAY: [];
};

export default ConfigType;
