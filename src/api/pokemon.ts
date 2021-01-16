import { IMove } from "types/IMove";
import { IPokemon } from "types/IPokemon";
import { IPokemonItem } from "types/IPokemonItem";
import { normalizeMoveName } from "utils/strings";
import client from "./client";
import { queryGetPokemonList, queryPokemonDetail, queryPokemonMoves } from "./queries";

export const apiGetPokemonList = async (offset: number, limit: number) => {
  const { data } = await client.query({
    query: queryGetPokemonList,
    variables: {
      offset: offset,
      limit: limit,
    },
  });

  if (data) {
    const resultPokemons: IPokemonItem[] = data.pokemons.results.map((pokemon: any) => {
      const resultPokemon: IPokemonItem = {
        image: pokemon.image,
        name: pokemon.name,
        id: pokemon.id,
      };
      return resultPokemon;
    });
    return {
      ok: true,
      data: resultPokemons,
    };
  } else {
    return {
      ok: false,
    };
  }
};

export const apiGetPokemonDetail = async (name: string) => {
  const { data: dataPokemon } = await client.query({
    query: queryPokemonDetail,
    variables: {
      name: name,
    },
  });

  if (!dataPokemon) {
    return {
      ok: false,
    };
  }

  const paramsMoves = dataPokemon.pokemon.moves.map((item: any) => {
    return item.move.name;
  });

  const { data: dataMoves } = await client.query({
    query: queryPokemonMoves,
    variables: {
      move1: paramsMoves[0],
      move2: paramsMoves[1],
      move3: paramsMoves[2],
      move4: paramsMoves[3],
    },
  });

  if (!dataMoves) {
    return {
      ok: false,
    };
  }

  const resultMoves: IMove[] = [];
  for (let i = 1; i <= 4; i++) {
    const data = dataMoves["move" + i].response;
    const newMove: IMove = {
      id: data.id,
      name: normalizeMoveName(data.name),
      pp: data.pp,
      type: data.type.name,
    };
    resultMoves.push(newMove);
  }

  const resultPokemon: IPokemon = {
    name: name,
    id: dataPokemon.pokemon.id,
    moves: resultMoves,
    image: dataPokemon.pokemon.sprites.front_default,
    types: dataPokemon.pokemon.types.map((item: any) => item.type.name),
  };

  return {
    ok: true,
    data: resultPokemon,
  };
};
