import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { queryPokemonList } from "api/queries";
import Card from "components/Card";
import PokemonItem from "components/PokemonItem";
import React, { useEffect, useState } from "react";
import { IPokemonItem } from "types/IPokemonItem";

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
  const [pokemons, setpokemons] = useState<IPokemonItem[]>([]);

  const { loading, error, data } = useQuery(queryPokemonList);

  useEffect(() => {
    if (data) {
      const resultPokemons: IPokemonItem[] = data.pokemons.results.map((pokemon: any) => {
        const resultPokemon: IPokemonItem = {
          image: pokemon.image,
          name: pokemon.name,
        };
        return resultPokemon;
      });
      setpokemons(resultPokemons);
    }
  }, [data]);

  return (
    <PageContainer>
      <Card>
        <PokemonList>
          {pokemons.map((item, index) => {
            return <PokemonItem data={item} key={index} />;
          })}
        </PokemonList>
      </Card>
    </PageContainer>
  );
};

export default AllPokemon;
