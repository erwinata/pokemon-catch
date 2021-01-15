import styled from "@emotion/styled";
import React from "react";
import { capitalizeEachWord } from "../utils/strings";

interface Props {
  type: string;
  small?: boolean;
}

interface ContainerProps {
  color: string;
  small?: boolean;
}

const Container = styled.div<ContainerProps>`
  font-weight: 700;
  font-size: ${(props) => (props.small ? "0.8rem" : "0.8rem")};
  border-radius: 9999px;
  background: ${(props) => props.color};
  padding: ${(props) => (props.small ? "0.15rem 0.05rem" : "0.35rem 0.25rem")};
  width: ${(props) => (props.small ? "5rem" : "7rem")};
  text-align: center;
  color: white;
  text-shadow: 0 2px 3px rgba(31, 38, 135, 0.5);
  display: inline-block;
  border: ${(props) => !props.small && "3px white solid"};
  flex-shrink: 0;
`;

const colorList = {
  bug: "rgba(194, 210, 31, 1)",
  dark: "rgba(138, 102, 83, 1)",
  dragon: "rgba(138, 118, 255, 1)",
  electric: "rgba(253, 229, 62, 1)",
  fairy: "rgba(249, 173, 255, 1)",
  fighting: "rgba(168, 86, 69, 1)",
  fire: "rgba(250, 86, 67, 1)",
  flying: "rgba(121, 163, 255, 1)",
  ghost: "rgba(120, 116, 212, 1)",
  grass: "rgba(141, 216, 81, 1)",
  ground: "rgba(238, 204, 86, 1)",
  ice: "rgba(150, 241, 255, 1)",
  normal: "rgba(147, 156, 181, 1)",
  poison: "rgba(170, 93, 162, 1)",
  psychic: "rgba(250, 101, 181, 1)",
  rock: "rgba(204, 188, 113, 1)",
  steel: "rgba(196, 194, 219, 1)",
  water: "rgba(86, 173, 255, 1)",
};

const ElementType: React.FC<Props> = (props) => {
  const colorIndex: keyof typeof colorList = props.type as any;
  let color = colorList[colorIndex] ?? colorList.normal;

  return (
    <Container color={color} small={props.small}>
      {capitalizeEachWord(props.type)}
    </Container>
  );
};

export default ElementType;
