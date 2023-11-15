import styled from "styled-components";
import { ThemeProps } from "../theme";

interface BackgroundProps extends ThemeProps {
  background: string;
}

export const LoginContainer = styled.div<BackgroundProps>`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  color: #fff;
  .left-Wrraper {
    width: 50%;
    background-image: url(${(props) => props.background});
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: center;
    padding: 12% 20px 20px;
    display: flex;
    position: relative;
    .left-Wrraper-filter {
      backdrop-filter: blur(5px);
      background-color: rgba(9, 23, 28, 0.1);
      position: absolute;
      top: 0%;
      bottom: 0%;
      left: 0%;
      right: 0%;
    }
    .left-Wrraper-container {
      z-index: 10;
      position: relative;
      a {
        max-width: 120px;
        margin-bottom: 60px;
        text-decoration: none;
        color: #fff;
        transition: color 0.2s;
        &:hover {
          color: aqua;
        }
      }
      h1 {
        width: 100%;
        max-width: 510px;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 50px;
        font-weight: 400;
        line-height: 1.2;
        margin: 0.67em 0;
      }
    }
  }
  .right-Wrraper {
    width: 50%;
    background-color: #09171c;
    padding: 12% 20px 20px;
    .right-container {
      width: 100%;
      max-width: 370px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
