import { render, screen } from "@testing-library/react";
import PokemonItem from "components/PokemonItem";
import React from "react";
import { samplePokemon } from "utils/samples";

test("wild pokemon item render data correctly", () => {
  render(<PokemonItem data={samplePokemon} totalOwned={9} />);

  //pokemon name
  expect(screen.queryByText(samplePokemon.name)).toBeTruthy();
  //total owned
  expect(screen.queryByText("x9")).toBeTruthy();
  //image
  expect(screen.getByTestId("pokemon-image")).toHaveAttribute("src", samplePokemon.image);
});
