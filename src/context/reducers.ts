import { AppActions } from "./actions";
import { IAppState } from "./context";

export const appReducer = (state: IAppState, action: AppActions): IAppState => {
  switch (action.type) {
    case "SET_WILD_POKEMON":
      return {
        ...state,
        wildPokemon: action.pokemons,
      };
    case "ADD_TO_MY_POKEMON":
      return {
        ...state,
        myPokemon: [action.pokemon, ...state.myPokemon],
      };
    case "RELEASE_MY_POKEMON":
      return {
        ...state,
        myPokemon: state.myPokemon.filter((pokemon) => {
          return pokemon.nickname !== action.pokemon.nickname;
        }),
      };
    default:
      return state;
  }
};
