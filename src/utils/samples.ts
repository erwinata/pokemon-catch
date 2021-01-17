import { IMove } from "types/IMove";
import { IPokemon } from "types/IPokemon";
import { IPokemonItem } from "types/IPokemonItem";

export const samplePokemon: IPokemonItem = {
  id: 1,
  image: "/sampleimage.jpg",
  name: "sample_name",
  nickname: "sample_nickname",
};

export const samplePokemonMove: IMove = {
  id: 1,
  name: "sample_move",
  pp: 99,
  type: "normal",
};

export const samplePokemonDetail: IPokemon = {
  id: 1,
  image: "/sampleimage.jpg",
  name: "sample_name",
  moves: [samplePokemonMove, samplePokemonMove, samplePokemonMove, samplePokemonMove],
  types: ["fairy"],
};
