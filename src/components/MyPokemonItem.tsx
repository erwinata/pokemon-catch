import styled from "@emotion/styled";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { IPokemonItem } from "../types/IPokemonItem";
import mq from "../utils/mediaqueries";
import PokemonImage from "./PokemonImage";

interface Props {
  data: IPokemonItem;
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  width: calc(100%);
  padding: 0.5rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transform: translateY(0);
  transition: 0.1s ease;
  cursor: default;
  ${mq.xs} {
    width: calc(50% - (0.5rem / 2));
  }
  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);
  }
`;

const ImageContainer = styled.div`
  width: 20%;
`;

const NameContainer = styled.div`
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;

  & h1 {
    font-size: 1rem;
    font-weight: 600;
    ${mq.xs} {
      font-size: 1.25rem;
    }
  }
  & h2 {
    font-size: 0.8rem;
    ${mq.xs} {
      font-size: 0.9rem;
    }
  }
`;

const ReleaseButton = styled.button`
  padding: 1rem;
  opacity: 0.2;
  &:hover {
    opacity: 0.6;
  }
`;

const MyPokemonItem: React.FC<Props> = (props) => {
  const history = useHistory();

  const { state, dispatch } = useContext(AppContext);
  const { releaseMyPokemon } = useActions(state, dispatch);

  const handle = {
    openPokemon: () => {
      history.push(`/pokemon/${props.data.name}`);
    },
    releasePokemon: () => {
      releaseMyPokemon(props.data);
    },
  };

  return (
    <Container onClick={handle.openPokemon}>
      <ImageContainer>
        <PokemonImage src={props.data.image} />
      </ImageContainer>
      <NameContainer>
        <h1>{props.data.nickname}</h1>
        <h2>{props.data.name}</h2>
      </NameContainer>
      <ReleaseButton
        onClick={(e) => {
          e.stopPropagation();
          handle.releasePokemon();
        }}
      >
        <img src="/x-black.svg" />
      </ReleaseButton>
    </Container>
  );
};

export default MyPokemonItem;
