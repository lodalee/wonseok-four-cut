import { DefaultTheme } from "styled-components";

export interface ThemeProps {
  theme: DefaultTheme;
}

const size = {
  small: `(max-width: 600px)`,
  large: `(max-width: 1200px)`,
};
export type Sizetypes = typeof size;

const theme: DefaultTheme = {
  size,
};

export default theme;
