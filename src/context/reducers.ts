import { localSaveMyPokemon } from "../local/myPokemon";
import { AppActions } from "./actions";
import { IAppState } from "./context";

export const appReducer = (state: IAppState, action: AppActions): IAppState => {
  switch (action.type) {
    case "SET_SHOW_MY_POKEMON": {
      return {
        ...state,
        showMyPokemon: action.show,
      };
    }
    case "SET_WILD_POKEMON": {
      return {
        ...state,
        wildPokemon: [...state.wildPokemon, ...action.pokemons],
      };
    }
    case "ADD_TO_MY_POKEMON": {
      const resultMyPokemon = [action.pokemon, ...state.myPokemon];
      localSaveMyPokemon(resultMyPokemon);

      return {
        ...state,
        myPokemon: resultMyPokemon,
      };
    }
    case "RELEASE_MY_POKEMON": {
      const resultMyPokemon = state.myPokemon.filter((pokemon) => {
        return pokemon.nickname !== action.pokemon.nickname;
      });
      localSaveMyPokemon(resultMyPokemon);

      return {
        ...state,
        myPokemon: resultMyPokemon,
      };
    }
    default:
      return state;
  }
};
