import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatchPopup from "components/CatchPopup";
import { AppContext, IAppState } from "context/context";
import React from "react";
import { getRandomBoolean, getRandomTimeout } from "utils/random";
import { samplePokemon, samplePokemonDetail } from "utils/samples";

jest.mock("utils/random");

const initialState: IAppState = {
  showMyPokemon: false,
  wildPokemon: [],
  myPokemon: [{ ...samplePokemon, nickname: "used_nickname" }],
};

test("catch pokemon and give nickname", async () => {
  const fakeDispatch = jest.fn();

  //faking results of catch
  const fakeRandomBoolean = getRandomBoolean as jest.MockedFunction<typeof getRandomBoolean>;
  fakeRandomBoolean.mockReturnValue(true);
  //faking timeout so no need to wait
  const fakeRandomTimeout = getRandomTimeout as jest.MockedFunction<typeof getRandomTimeout>;
  fakeRandomTimeout.mockReturnValue(0);

  render(
    <AppContext.Provider value={{ state: initialState, dispatch: fakeDispatch }}>
      <CatchPopup pokemon={samplePokemonDetail} exitCatching={() => {}} />
    </AppContext.Provider>
  );

  // await waitForElementToBeRemoved(() => screen.getByRole("img"));

  // screen.debug();

  // //show try again button when failed
  // expect(screen.queryByText("Try again")).toBeTruthy();

  // fakeRandomBoolean.mockReturnValue(true);
  // fireEvent.click(screen.getByText("Try again"));

  await waitForElementToBeRemoved(() => screen.getByRole("img"));

  //show form
  expect(screen.queryByText(/Nickname/)).toBeTruthy();
  expect(screen.queryByRole("input")).toBeTruthy();
  expect(screen.queryByRole("button")).toBeTruthy();

  const input = screen.getByRole("input");
  const button = screen.getByRole("button");

  fireEvent.click(button);
  //check error message of empty nickname
  expect(screen.queryByText("Nickname cannot be empty")).toBeTruthy();

  userEvent.type(input, "used_nickname");
  fireEvent.click(button);
  //check error message of existed nickname
  expect(screen.queryByText("Nickname already used")).toBeTruthy();
  expect(fakeDispatch).toBeCalledTimes(0);

  userEvent.type(input, "new_nickname");
  fireEvent.click(button);
  //check valid nickname and call dispatch function
  expect(fakeDispatch).toBeCalledTimes(1);
});
