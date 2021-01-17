import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { apiGetPokemonDetail, apiGetPokemonList } from "api/pokemon";
import PokemonDetail from "pages/PokemonDetail";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { samplePokemon, samplePokemonDetail } from "utils/samples";
import { capitalizeEachWord } from "utils/strings";

jest.mock("api/pokemon");

test("fetch mocked pokemon detail and render data correctly", async () => {
  const mockGetPokemonList = apiGetPokemonList as jest.MockedFunction<typeof apiGetPokemonList>;
  mockGetPokemonList.mockResolvedValue({
    ok: true,
    data: [samplePokemon, samplePokemon, samplePokemon],
  });

  const mockPokemonDetail = apiGetPokemonDetail as jest.MockedFunction<typeof apiGetPokemonDetail>;
  mockPokemonDetail.mockResolvedValue({
    ok: true,
    data: samplePokemonDetail,
  });

  render(
    <MemoryRouter initialEntries={["/pokemon/sample_name"]}>
      <Route path="/pokemon/:name">
        <PokemonDetail />
      </Route>
    </MemoryRouter>
  );

  //wait for loader done
  await waitForElementToBeRemoved(() => screen.getByTestId("loader"));

  //pokemon name
  expect(screen.queryAllByText(capitalizeEachWord(samplePokemonDetail.name))).toBeTruthy();
  //pokemon type
  expect(screen.queryByText(capitalizeEachWord(samplePokemonDetail.types[0]))).toBeTruthy();
  //pokemon moves
  expect(screen.queryAllByText(samplePokemonDetail.moves[0].name)).toHaveLength(4);
  expect(screen.queryAllByText(capitalizeEachWord(samplePokemonDetail.moves[0].type))).toHaveLength(
    4
  );
  expect(screen.queryAllByText(samplePokemonDetail.moves[0].pp)).toHaveLength(4);
  //image
  expect(screen.getAllByTestId("pokemon-image")[1]).toHaveAttribute(
    "src",
    samplePokemonDetail.image
  );
});
