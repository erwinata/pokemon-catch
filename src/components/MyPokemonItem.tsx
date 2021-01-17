import styled from "@emotion/styled";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { IPokemonItem } from "../types/IPokemonItem";
import mq from "../utils/mediaqueries";
import Button from "./Button";
import PokemonImage from "./PokemonImage";

interface Props {
  data: IPokemonItem;
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.8);
  width: calc(100%);
  border-top: 1px solid #d5d4e2;
  padding: 0.5rem 1rem;
  height: 70px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transform: translateY(0);
  transition: 0.1s ease;
  cursor: default;
`;

const ImageContainer = styled.div`
  width: 20%;
  max-width: 55px;
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
  padding: 0.75rem;
  opacity: 0.2;
  &:hover {
    opacity: 0.6;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const MyPokemonItem: React.FC<Props> = (props) => {
  const history = useHistory();

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { showMyPokemon, releaseMyPokemon } = useActions(state, dispatch);

  const handle = {
    openPokemon: () => {
      showMyPokemon(false);
      history.push(`/pokemon/${props.data.name}`);
    },
    releasePokemon: () => {
      releaseMyPokemon(props.data);
    },
  };

  return (
    <Container onClick={handle.openPokemon}>
      <ImageContainer>
        <PokemonImage src={props.data.image} alt={props.data.name} />
      </ImageContainer>
      {!deleteConfirm ? (
        <>
          <NameContainer>
            <h1>{props.data.nickname}</h1>
            <h2>{props.data.name}</h2>
          </NameContainer>
          <ReleaseButton
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(true);
            }}
            data-testid="button-release"
          >
            <img src="/x-black.svg" alt="release" />
          </ReleaseButton>
        </>
      ) : (
        <>
          <NameContainer>
            <h2>Release</h2>
            <h1>{props.data.nickname}?</h1>
          </NameContainer>
          <ButtonContainer>
            <Button
              size="sm"
              color="danger"
              onClick={(e) => {
                e.stopPropagation();
                handle.releasePokemon();
              }}
            >
              Yes
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteConfirm(false);
              }}
            >
              No
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default MyPokemonItem;
