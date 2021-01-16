import styled from "@emotion/styled";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext } from "react";
import mq from "utils/mediaqueries";

interface Props {}

const Container = styled.div`
  position: relative;
  padding: 0.25rem 1rem;
  margin-right: 0.5rem;
  background: #36393c;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: 0.1s ease;
  cursor: default;

  &:hover {
    background: #474c52;
  }

  & img {
    width: 40px;
  }

  & span {
    display: none;
    ${mq.md} {
      display: block;
    }
  }
`;

const PokemonNumber = styled.div`
  position: absolute;
  right: -10px;
  top: 0;
  background: #ff4a4a;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  color: white;
`;

const MyPokemonButton: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { showMyPokemon } = useActions(state, dispatch);

  const handle = {
    clickLogo: () => {
      showMyPokemon(false);
    },
    toggleOpenMyPokemon: () => {
      showMyPokemon(!state.showMyPokemon);
    },
  };

  return (
    <Container onClick={handle.toggleOpenMyPokemon}>
      {state.myPokemon.length > 0 && <PokemonNumber>{state.myPokemon.length}</PokemonNumber>}
      <img src="/pokeball.png" />
      <span>My Pokemon</span>
    </Container>
  );
};

export default MyPokemonButton;
