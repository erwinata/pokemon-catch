import styled from "@emotion/styled";
import Navbar from "components/Navbar";
import { AppContext } from "context/context";
import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import MyPokemon from "./pages/MyPokemon";
import NotFound from "./pages/NotFound";
import PokemonDetail from "./pages/PokemonDetail";

const Container = styled.div`
  background: url("/bg.png") no-repeat center center fixed;
  background-size: 100vw calc(100vh + 60px);
  min-height: 100vh;
  padding-top: 90px;
`;

const App: React.FC<any> = (props) => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        {state.showMyPokemon && <MyPokemon />}

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/mypokemon" component={Main} />
          <Route exact path="/pokemon/:name" component={PokemonDetail} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
