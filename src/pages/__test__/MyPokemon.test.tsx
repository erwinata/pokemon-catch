import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppContext, IAppState } from "context/context";
import MyPokemon from "pages/MyPokemon";
import React from "react";
import { samplePokemon } from "utils/samples";

const initialState: IAppState = {
  showMyPokemon: false,
  wildPokemon: [],
  myPokemon: [samplePokemon],
};

test("release pokemon functionally works", () => {
  const mockDispatch = jest.fn();

  render(
    <AppContext.Provider value={{ state: initialState, dispatch: mockDispatch }}>
      <MyPokemon />
    </AppContext.Provider>
  );

  fireEvent.click(screen.getByTestId("button-release"));
  //should show release confirmation
  expect(screen.getByText("Yes")).toBeInTheDocument();

  fireEvent.click(screen.getByText("No"));
  //should close release confirmation
  expect(screen.getByTestId("button-release")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("button-release"));
  fireEvent.click(screen.getByText("Yes"));

  //should call dispatch release function one time
  expect(mockDispatch).toBeCalledTimes(1);
});
