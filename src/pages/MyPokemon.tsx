import styled from "@emotion/styled";
import MyPokemonItem from "components/MyPokemonItem";
import { AppContext } from "context/context";
import React, { useContext } from "react";

interface Props {}

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  min-height: 80vh;
`;

const MyPokemon: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <PokemonList>
      {state.myPokemon.map((pokemon, index) => {
        return <MyPokemonItem data={pokemon} key={index} />;
      })}
    </PokemonList>
  );
};

export default MyPokemon;
