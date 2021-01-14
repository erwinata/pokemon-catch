import { IMove } from "./IMove";

export interface IPokemon {
  id: number;
  name: string;
  image: string;
  moves: IMove[];
  types: string[];
}
