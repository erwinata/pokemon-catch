import { IPokemonItem } from "types/IPokemonItem";

export type AppActions =
  | { type: "SET_WILD_POKEMON"; pokemons: IPokemonItem[] }
  | { type: "SET_WILD_POKEMON"; pokemons: IPokemonItem[] }
  | { type: "ADD_TO_MY_POKEMON"; pokemon: IPokemonItem }
  | { type: "RELEASE_MY_POKEMON"; pokemon: IPokemonItem };
