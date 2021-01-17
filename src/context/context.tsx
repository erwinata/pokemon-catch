import { localLoadMyPokemon } from "local/myPokemon";
import React, { createContext, useReducer } from "react";
import { IPokemonItem } from "types/IPokemonItem";
import { AppActions } from "./actions";
import { appReducer } from "./reducers";

export type IAppState = {
  showMyPokemon: boolean;
  wildPokemon: IPokemonItem[];
  myPokemon: IPokemonItem[];
};

const initialState: IAppState = {
  showMyPokemon: false,
  wildPokemon: [],
  myPokemon: localLoadMyPokemon(),
};

const AppContext = createContext<{
  state: IAppState;
  dispatch: React.Dispatch<AppActions> | any;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
