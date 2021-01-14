import styled from "@emotion/styled";
import React from "react";

interface Props {
  onClick?: () => any;
  type?: "submit" | "reset" | "button";
  color?: "primary" | "default";
}

interface ContainerProps {
  color: string;
}

const Container = styled.button<ContainerProps>`
  background: ${(props) => props.color};
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  width: auto;
  padding: 0.5rem 2rem;
  border-radius: 999px;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform: scale(1, 1);
  transition: 0.1s ease;
  & img {
    max-height: 24px;
  }
  &:hover {
    transform: scale(1.05, 1.05);
  }
`;

const colorList = {
  primary: "#8769e0",
  default: "#979eba",
};

const Button: React.FC<Props> = (props) => {
  let color = props.color ? colorList[props.color] : colorList.default;

  return (
    <Container {...props} color={color} onClick={props.onClick}>
      {props.children}
    </Container>
  );
};

export default Button;
