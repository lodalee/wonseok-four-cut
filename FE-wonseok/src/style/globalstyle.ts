import { createGlobalStyle } from "styled-components";
import { ThemeProps } from "./theme";

const GlobalStyle = createGlobalStyle<ThemeProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }
  body {
    /* color: #fff; */
    font-family: Outfit, sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.2;
  }
  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    color: transparent !important;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus{
    background-color: #000 !important;
  }
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  button {
    cursor: pointer;
  }

  .page-enter {
    opacity: 0;
    transform: scale(1.0);
  }
  
  .page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .page-exit {
    opacity: 1;
    transform: scale(1);
  }

  .page-exit-active {
    opacity: 0; 
    transform: scale(0.9);
    transition: opacity 500ms, transform 500ms;
  }
  `;

export default GlobalStyle;
