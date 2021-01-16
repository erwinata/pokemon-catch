import client from "api/client";
import { queryWildPokemonList } from "api/queries";
import { IPokemonItem } from "types/IPokemonItem";
import { AppActions } from "./actions";
import { IAppState } from "./context";

export const useActions = (state: IAppState, dispatch: React.Dispatch<AppActions>) => {
  const showMyPokemon = (show: boolean) => {
    dispatch({ type: "SET_SHOW_MY_POKEMON", show: show });
  };

  const fetchWildPokemon = async (offset: number, limit: number) => {
    const { data, error } = await client.query({
      query: queryWildPokemonList,
      variables: {
        offset: offset,
        limit: limit,
      },
    });

    if (error) return false;

    const resultPokemons: IPokemonItem[] = data.pokemons.results.map((pokemon: any) => {
      const resultPokemon: IPokemonItem = {
        image: pokemon.image,
        name: pokemon.name,
        id: pokemon.id,
      };
      return resultPokemon;
    });

    dispatch({ type: "SET_WILD_POKEMON", pokemons: resultPokemons });
    return true;
  };

  const addToMyPokemon = (pokemon: IPokemonItem) => {
    const nicknameExist = state.myPokemon.find((item) => {
      return (item.nickname ?? "").toLowerCase() === (pokemon.nickname ?? "").toLowerCase();
    });

    if (nicknameExist) {
      return false;
    }
    dispatch({ type: "ADD_TO_MY_POKEMON", pokemon: pokemon });
    return true;
  };

  const releaseMyPokemon = (pokemon: IPokemonItem) => {
    dispatch({ type: "RELEASE_MY_POKEMON", pokemon: pokemon });
  };

  return {
    showMyPokemon,
    fetchWildPokemon,
    addToMyPokemon,
    releaseMyPokemon,
  };
};
