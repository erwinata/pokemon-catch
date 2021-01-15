import styled from "@emotion/styled";
import Card from "components/Card";
import PokemonItem from "components/PokemonItem";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext, useEffect, useState } from "react";

interface Props {}

const PageContainer = styled.div`
  min-height: 100vh;
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 0.5rem;
`;

const AllPokemon: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { fetchWildPokemon } = useActions(state, dispatch);
  const { wildPokemon } = state;

  // const { loading, error, data } = useQuery(queryPokemonList);

  const startFetchingData = async () => {
    setIsLoading(true);

    const isSuccessFetch = await fetchWildPokemon(0, 30);
    if (!isSuccessFetch) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    startFetchingData();
  }, []);

  return (
    <PageContainer>
      <Card>
        <PokemonList>
          {wildPokemon.map((item, index) => {
            return <PokemonItem data={item} key={index} />;
          })}
        </PokemonList>
      </Card>
    </PageContainer>
  );
};

export default AllPokemon;
