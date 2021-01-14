import styled from "@emotion/styled";
import React from "react";
import { IMove } from "../types/IMove";
import mq from "../utils/mediaqueries";
import ElementType from "./ElementType";

interface Props {
  data: IMove;
}

const Container = styled.div`
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.65);
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  ${mq.sm} {
    font-size: 1rem;
  }

  & h1 {
    flex-grow: 1;
  }
  & h2 {
    padding: 0.1rem 0.25rem;
    font-weight: normal;
    text-align: right;
    flex-shrink: 0;
    & span {
      font-weight: 600;
    }
  }
`;

const MoveItem: React.FC<Props> = (props) => {
  return (
    <Container>
      <ElementType type={props.data.type} />
      <h1>{props.data.name}</h1>
      <h2>
        PP<span> {props.data.pp}</span>
      </h2>
    </Container>
  );
};

export default MoveItem;
