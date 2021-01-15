import { AppActions } from "./actions";
import { IAppState } from "./context";

export const appReducer = (state: IAppState, action: AppActions): IAppState => {
  switch (action.type) {
    case "SET_WILD_POKEMON":
      return {
        ...state,
        wildPokemon: action.pokemons,
      };
    default:
      return state;
  }
};
