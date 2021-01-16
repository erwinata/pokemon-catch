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
  justify-content: center;
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 1.5rem;
`;

const WildPokemon: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flagFetchMore, setFlagFetchMore] = useState(true);

  const handleScroll = (e: any) => {
    e.preventDefault();
    checkIncreaseLimit();
  };

  const checkIncreaseLimit = () => {
    // const { scrollTop, scrollHeight, clientHeight } = window.screen;
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop >= scrollHeight - clientHeight * 2) {
      if (!flagFetchMore) {
        setFlagFetchMore(true);
      }
    }
  };

  const { state, dispatch } = useContext(AppContext);
  const { fetchWildPokemon } = useActions(state, dispatch);
  const { wildPokemon } = state;

  const startFetchingData = async (initialFetch?: boolean) => {
    setIsLoading(true);

    const offset = initialFetch ? 0 : state.wildPokemon.length;
    const limit = initialFetch ? 100 : 30;
    await fetchWildPokemon(offset, limit);

    setIsLoading(false);
    setFlagFetchMore(false);
  };

  useEffect(() => {
    if (flagFetchMore) {
      const initialFetch = state.wildPokemon.length === 0;
      startFetchingData(initialFetch);
    }
  }, [flagFetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, flagFetchMore]);

  return (
    <Container>
      {/* <InfiniteScroll
        dataLength={state.wildPokemon.length} //This is important field to render the next data
        next={startFetchingData}
        hasMore={true}
        loader={
          <LoadingContainer>
            <Spinner size={70} />
          </LoadingContainer>
        }
      > */}
      <PokemonList>
        {wildPokemon.map((item, index) => {
          return <PokemonItem data={item} key={index} />;
        })}
      </PokemonList>
      {/* </InfiniteScroll> */}

      {isLoading && (
        <LoadingContainer>
          <Spinner size={70} />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default WildPokemon;
