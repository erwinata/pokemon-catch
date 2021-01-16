import styled from "@emotion/styled";
import PokemonItem from "components/PokemonItem";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext, useEffect, useState } from "react";

interface Props {}

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 1rem;
  column-gap: 0.5rem;
  row-gap: 1.5rem;
  background: rgba(255, 255, 255, 1);
`;

const WildPokemon: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { fetchWildPokemon } = useActions(state, dispatch);
  const { wildPokemon } = state;

  const startFetchingData = async () => {
    setIsLoading(true);

    const isSuccessFetch = await fetchWildPokemon(0, 100);
    if (!isSuccessFetch) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    startFetchingData();
  }, []);

  return (
    <PokemonList>
      {wildPokemon.map((item, index) => {
        return <PokemonItem data={item} key={index} />;
      })}
    </PokemonList>
  );
};

export default WildPokemon;
