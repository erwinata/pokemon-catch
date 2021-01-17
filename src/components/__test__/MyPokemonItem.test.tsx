import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import MyPokemonItem from "components/MyPokemonItem";
import React from "react";
import { samplePokemon } from "utils/samples";

test("my pokemon item render data correctly", () => {
  render(<MyPokemonItem data={samplePokemon} />);

  //pokemon nickname
  expect(screen.queryByText(samplePokemon.nickname ?? "")).toBeTruthy();
  //pokemon name
  expect(screen.queryByText(samplePokemon.name)).toBeTruthy();
  //image
  expect(screen.getByTestId("pokemon-image")).toHaveAttribute("src", samplePokemon.image);
});
