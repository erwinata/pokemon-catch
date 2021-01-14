import styled from "@emotion/styled";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AllPokemon from "./AllPokemon";
import MyPokemon from "./MyPokemon";
import NotFound from "./NotFound";
import Pokemon from "./Pokemon";

const Container = styled.div`
  background: url("/bg.png") no-repeat center center fixed;
  background-size: cover;
  min-height: 120vh;
`;

const App: React.FC<any> = (props) => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={AllPokemon} />
          <Route exact path="/pokemon/:name" component={Pokemon} />
          <Route exact path="/mypokemon" component={MyPokemon} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
