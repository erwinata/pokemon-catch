import styled from "@emotion/styled";
import PokemonItem from "components/PokemonItem";
import Spinner from "components/Spinner";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext, useEffect, useState } from "react";

interface Props {}

const Container = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 2rem 1rem;
`;

const LoadingContainer = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 1.5rem;
`;

const WildPokemon: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { fetchWildPokemon } = useActions(state, dispatch);

  const [isMounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [flagFetchMore, setFlagFetchMore] = useState(state.wildPokemon.length === 0);

  const { wildPokemon } = state;

  useEffect(() => {
    setIsMounted(true);

    const startFetchingData = async (initialFetch?: boolean) => {
      setIsLoading(true);

      const offset = initialFetch ? 0 : state.wildPokemon.length;
      const limit = initialFetch ? 30 : 30;
      await fetchWildPokemon(offset, limit);

      if (!isMounted) return;

      setFlagFetchMore(false);
      setIsLoading(false);
    };

    if (flagFetchMore && !isLoading) {
      const initialFetch = state.wildPokemon.length === 0;
      startFetchingData(initialFetch);
    }

    return () => {
      setIsMounted(false);
    };
  }, [flagFetchMore, isLoading, fetchWildPokemon, state.wildPokemon.length, isMounted]);

  useEffect(() => {
    const handleScroll = (e: any) => {
      e.preventDefault();
      checkIncreaseLimit();
    };

    const checkIncreaseLimit = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop >= scrollHeight - clientHeight * 2) {
        if (!flagFetchMore) {
          setFlagFetchMore(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, flagFetchMore]);

  return (
    <Container>
      <PokemonList>
        {wildPokemon.map((item, index) => {
          const totalOwned = state.myPokemon.filter((pokemon) => {
            return item.id === pokemon.id;
          }).length;

          return <PokemonItem data={item} totalOwned={totalOwned} key={index} />;
        })}
      </PokemonList>

      {isLoading && (
        <LoadingContainer>
          <Spinner size={70} />
          <h1>Fetching Wild Pokemons...</h1>
        </LoadingContainer>
      )}
    </Container>
  );
};

export default WildPokemon;
