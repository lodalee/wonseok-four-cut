import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import styled, { css } from "styled-components";

interface StyledInputProps {
  InputSize: "large" | "medium" | "small" | "default" | "custom";
  color: "black" | "white" | "default" | "custom";
  backgroundColor?: string;
  valueSize?: number;
}

export interface InputProps extends StyledInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type?: "default" | "price" | HTMLInputTypeAttribute | "password";
  placeholder?: string;
  id?: string;
  icon?: string;
  className?: string;
  disabled?: boolean;
}

const sizeStyles = {
  large: css``,
  medium: css`
    padding: 10px;
  `,
  small: css``,
  default: css``,
  custom: css``,
};

const colorStyles = {
  black: css`
    color: #000;
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
    &:focus::placeholder {
      color: rgba(0, 0, 0, 1);
    }
  `,
  white: css`
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  `,
  default: css`
    color: #000;
    &::placeholder {
      color: #000;
    }
  `,
  custom: css`
    color: #fff;
  `,
};

const MyInput = styled.input<StyledInputProps>`
  height: 50px;
  width: 100%;
  line-height: 1.42857;
  border: none;
  outline: none;
  margin-bottom: 0;
  background-color: transparent;
  vertical-align: middle;
  font-size: ${(props) => props.valueSize}px;

  transition: border 0.2s;

  &::placeholder {
    transition: color 0.5s;
    color: rgba(255, 255, 255, 0.2);
    font-weight: 400;
  }
  &:focus::placeholder {
    color: rgba(255, 255, 255, 1);
  }

  ${(props) => sizeStyles[props.InputSize || "default"]}
  ${(props) => colorStyles[props.color || "default"]}
`;

const Input: React.FC<InputProps> = (props) => {
  const {
    color = "default",
    id,
    backgroundColor,
    onChange,
    valueSize,
    InputSize = "default",
    value,
    disabled,
    type = "text",
    placeholder,

    className,
  } = props;
  return (
    <MyInput
      valueSize={valueSize}
      id={id}
      backgroundColor={backgroundColor}
      className={className}
      color={color}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      InputSize={InputSize}
      value={value}
      disabled={disabled}
    />
  );
};
export default Input;
