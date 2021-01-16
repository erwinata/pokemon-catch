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

const Container = styled.div`
  display: none;

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
  if (!props.data) return null;

  return (
    <Container onClick={props.onClick}>
      <Card maxWidth={120}>
        <ContentContainer>
          <PokemonImage src={props.data.image} />
          <h1>{capitalizeEachWord(props.data.name)}</h1>
        </ContentContainer>
      </Card>
    </Container>
  );
};

export default OtherPokemon;
