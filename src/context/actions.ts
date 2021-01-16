import { IPokemonItem } from "types/IPokemonItem";

export type AppActions =
  | { type: "SET_SHOW_MY_POKEMON"; show: boolean }
  | { type: "SET_WILD_POKEMON"; pokemons: IPokemonItem[] }
  | { type: "ADD_TO_MY_POKEMON"; pokemon: IPokemonItem }
  | { type: "RELEASE_MY_POKEMON"; pokemon: IPokemonItem };
