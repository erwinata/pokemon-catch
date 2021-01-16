import { apiGetPokemonList } from "api/pokemon";
import { IPokemonItem } from "types/IPokemonItem";
import { AppActions } from "./actions";
import { IAppState } from "./context";

export const useActions = (state: IAppState, dispatch: React.Dispatch<AppActions>) => {
  const showMyPokemon = (show: boolean) => {
    dispatch({ type: "SET_SHOW_MY_POKEMON", show: show });
  };

  const fetchWildPokemon = async (offset: number, limit: number) => {
    const resultPokemons = await apiGetPokemonList(offset, limit);

    if (!resultPokemons.data) {
      return false;
    }

    dispatch({ type: "SET_WILD_POKEMON", pokemons: resultPokemons.data });
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
