import { IPokemonItem } from "types/IPokemonItem";
import { getLocal, setLocal } from "./localstorage";

export const KEY_MY_POKEMON = "MY_POKEMON";

export const localSaveMyPokemon = (data: IPokemonItem[]) => {
  setLocal(KEY_MY_POKEMON, data);
};

export const localLoadMyPokemon = (): IPokemonItem[] => {
  const localData = getLocal(KEY_MY_POKEMON);
  if (localData) {
    return getLocal(KEY_MY_POKEMON);
  } else {
    return [];
  }
};
