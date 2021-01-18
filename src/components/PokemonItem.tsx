import styled from "@emotion/styled";
import React from "react";
import { useHistory } from "react-router-dom";
import { IPokemonItem } from "../types/IPokemonItem";
import mq from "../utils/mediaqueries";
import PokemonImage from "./PokemonImage";

interface Props {
  data: IPokemonItem;
  totalOwned: number;
}

const Container = styled.div`
  border-radius: 4px;
  width: calc(25% - (1.5rem / 4));
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  cursor: default;
  ${mq.xs} {
    width: calc(20% - (2rem / 5));
  }
  ${mq.md} {
    width: calc(16.6667% - (2.5rem / 6));
  }
  ${mq.lg} {
    width: calc(12.5% - (3.5rem / 8));
  }
  & img {
    transform: scale(1, 1);
    transition: 0.1s ease;
  }
  &:hover img {
    transform: scale(1.1, 1.1);
  }
`;

const ImageContainer = styled.div`
  width: 80%;
  position: relative;
`;

const TotalOwned = styled.div`
  position: absolute;
  z-index: 1;
  right: -0.5rem;
  background: #7894d1;
  padding: 2px 0.5rem;
  border-radius: 9999px;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  ${mq.xs} {
    font-size: 1rem;
  }
`;

const Name = styled.div`
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
  font-size: 0.7rem;
  ${mq.xs} {
    font-size: 0.8rem;
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
    <Container onClick={handle.openPokemon}>
      <ImageContainer>
        {props.totalOwned > 0 && <TotalOwned>{`x${props.totalOwned}`}</TotalOwned>}
        <PokemonImage src={props.data.image} alt={props.data.name} />
      </ImageContainer>
      <Name>{props.data.name}</Name>
    </Container>
  );
};

export default PokemonItem;
