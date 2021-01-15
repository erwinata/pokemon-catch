import styled from "@emotion/styled";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Pokemon from "./Pokemon";

const Container = styled.div`
  background: url("/bg.png") no-repeat center center fixed;
  background-size: 100vw calc(100vh + 60px);
  min-height: 100vh;
`;

const App: React.FC<any> = (props) => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/mypokemon" component={Main} />
          <Route exact path="/pokemon/:name" component={Pokemon} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
