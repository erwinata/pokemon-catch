import styled from "@emotion/styled";
import React from "react";
import { useHistory } from "react-router-dom";
import { IPokemonItem } from "../types/IPokemonItem";
import mq from "../utils/mediaqueries";
import PokemonImage from "./PokemonImage";

interface Props {
  data: IPokemonItem;
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  width: calc(33.3333% - (1rem / 3));
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  transform: translateY(0);
  transition: 0.1s ease;
  ${mq.xs} {
    width: calc(25% - (1.5rem / 4));
  }
  ${mq.md} {
    width: calc(20% - (2rem / 5));
  }
  ${mq.lg} {
    width: calc(16.6667% - (2.5rem / 6));
  }
  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);
  }
`;

const ImageContainer = styled.div`
  width: 80%;
  max-width: 120px;
`;

const Name = styled.div`
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  ${mq.xs} {
    font-size: 1rem;
  }
`;

const PokemonItem: React.FC<Props> = (props) => {
  const history = useHistory();

  const handle = {
    openPokemon: () => {
      history.push(`/pokemon/${props.data.name}`);
    },
  };

  return (
    // <Link to={`/pokemon/${props.data.name}`}>
    <Container onClick={handle.openPokemon}>
      <ImageContainer>
        <PokemonImage src={props.data.image} />
      </ImageContainer>
      <Name>{props.data.name}</Name>
    </Container>
  );
};

export default PokemonItem;
