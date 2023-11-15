import "styled-components";
import { Sizetypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    size: Sizetypes;
  }
}
