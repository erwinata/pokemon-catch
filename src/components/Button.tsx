import styled from "@emotion/styled";
import React from "react";

interface Props {
  onClick?: (...params: any) => any;
  type?: "submit" | "reset" | "button";
  color?: "primary" | "default" | "danger";
  size?: "sm" | "md" | "lg";
}

interface ContainerProps {
  color: string;
  fontSize: string;
  padding: string;
}
const Container = styled.button<ContainerProps>`
  background: ${(props) => props.color};
  color: white;
  font-weight: 600;
  font-size: ${(props) => props.fontSize};
  width: auto;
  padding: ${(props) => props.padding};
  border-radius: 999px;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform: scale(1, 1);
  transition: 0.1s ease;
  & img {
    max-height: 1.5rem;
  }
  &:hover {
    transform: scale(1.05, 1.05);
  }
`;

const colorList = {
  primary: "#8769e0",
  danger: "#e74545",
  default: "#979eba",
};

const fontSizeList = {
  sm: "0.9rem",
  md: "1rem",
  lg: "1.25rem",
};

const paddingList = {
  sm: "0.25rem 0.75rem",
  md: "0.25rem 1.25rem",
  lg: "0.5rem 2rem",
};

const Button: React.FC<Props> = (props) => {
  let color = props.color ? colorList[props.color] : colorList.default;
  let fontSize = props.size ? fontSizeList[props.size] : fontSizeList.md;
  let padding = props.size ? paddingList[props.size] : paddingList.md;

  return (
    <Container color={color} fontSize={fontSize} padding={padding} onClick={props.onClick}>
      {props.children}
    </Container>
  );
};

export default Button;
