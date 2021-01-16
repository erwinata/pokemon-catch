import styled from "@emotion/styled";
import React from "react";
import { IPokemonItem } from "types/IPokemonItem";
import mq from "utils/mediaqueries";
import { capitalizeEachWord } from "utils/strings";
import Card from "./Card";
import PokemonImage from "./PokemonImage";

interface Props {
  data: IPokemonItem;
  onClick: () => void;
}

interface ContainerProps {
  invisible: boolean;
}
const Container = styled.div<ContainerProps>`
  display: none;
  visibility: ${(props) => props.invisible && "hidden"};
  width: 120px;

  ${mq.sm} {
    display: block;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1rem;

  & h1 {
    color: white;
    font-weight: 600;
  }
`;

const OtherPokemon: React.FC<Props> = (props) => {
  return (
    <Container onClick={props.onClick} invisible={props.data === undefined}>
      <Card maxWidth={120}>
        <ContentContainer>
          <PokemonImage src={props.data?.image ?? ""} alt={props.data?.name ?? ""} />
          <h1>{capitalizeEachWord(props.data?.name ?? "")}</h1>
        </ContentContainer>
      </Card>
    </Container>
  );
};

export default OtherPokemon;
