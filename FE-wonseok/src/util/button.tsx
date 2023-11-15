import styled, { css } from "styled-components";

interface StyledButtonProps {
  color: "red" | "green" | "white" | "default" | "custom";
  size: "large" | "small" | "medium" | "default" | "custom";
}
export interface ButtonProps extends StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  title: JSX.Element;
  type?: "button" | "submit" | "reset";
}
const sizeStyles = {
  large: css`
    background-color: #fff;
    border: 3px solid;
    height: 50px;
    width: 200px;
    font-weight: 600;

    &:active {
      background-color: rgb(238, 238, 238);
    }
  `,
  medium: css`
    height: 45px;
    width: 130px;
  `,
  small: css`
    height: 40px;
    width: 100px;
  `,
  default: css`
    height: auto;
    width: auto;
  `,
  custom: css`
    height: 50px;
    width: 100%;
  `,
};

const colorStyles = {
  red: css`
    /* ... */
  `,

  white: css`
    /* ... */
  `,
  green: css`
    background-color: rgb(85, 239, 196);
    color: black;
    border-color: #4dff5f;

    &:active {
      background-color: rgb(0, 184, 148);
    }
  `,
  default: css`
    background-color: rgb(250, 177, 160);
    color: rgb(214, 48, 49);
    border-color: rgb(250, 177, 160);

    &:active {
      background-color: rgb(225, 112, 85);
    }
  `,

  custom: css`
    background-color: #00e1db;
    border: 1px solid #00e1db;
    color: #000;
    &:active {
      background-color: rgb(225, 112, 85);
    }
    &:hover {
      color: #00e1db;
      background-color: rgba(0, 0, 0, 0);
    }
  `,
};

const MyButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
  transition:
    background-color 0.2s,
    color 0.2s;

  ${(props) => sizeStyles[props.size || "default"]}
  ${(props) => colorStyles[props.color || "default"]}
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, title, type, color, size } = props;

  return (
    <MyButton onClick={onClick} color={color} size={size} type={type}>
      {title}
    </MyButton>
  );
};
export default Button;
