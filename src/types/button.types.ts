export type ButtonType = 'button' | 'submit';
export type ButtonTheme = 'main';
export type ButtonPropertiesObject = {
  id: number | string;
  label: string;
  buttonTheme?: ButtonTheme;
  action?: string;
};
