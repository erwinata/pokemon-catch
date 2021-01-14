import { gql } from "@apollo/client";

// const client = ...
export const queryPokemonList = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

export const queryPokemonDetail = gql`
  {
    pokemon(name: "$name") {
      id
      moves {
        move {
          name
        }
      }
      name
      types {
        type {
          name
        }
      }
      sprites {
        front_default
      }
    }
  }
`;
