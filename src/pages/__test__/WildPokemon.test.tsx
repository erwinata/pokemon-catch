import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { apiGetPokemonList } from "api/pokemon";
import { AppProvider } from "context/context";
import WildPokemon from "pages/WildPokemon";
import React from "react";
import { samplePokemon } from "utils/samples";

jest.mock("api/pokemon");

test("fetch mocked wild pokemon", async () => {
  const mockGetPokemonList = apiGetPokemonList as jest.MockedFunction<typeof apiGetPokemonList>;
  mockGetPokemonList.mockResolvedValue({
    ok: true,
    data: [samplePokemon, samplePokemon],
  });

  render(
    <AppProvider>
      <WildPokemon />
    </AppProvider>
  );

  //show loading
  expect(await screen.findByText(/Fetching/)).toBeTruthy();

  //render pokemon list data same as fetched
  expect(screen.queryAllByText(samplePokemon.name)).toHaveLength(2);
});
