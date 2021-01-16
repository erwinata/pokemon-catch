import styled from "@emotion/styled";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Card from "../components/Card";
import MyPokemon from "./MyPokemon";
import WildPokemon from "./WildPokemon";

interface Props {}

const PageContainer = styled.div`
  margin: 0 auto;
  width: 95%;
`;

const Main: React.FC<Props> = (props) => {
  return (
    <PageContainer>
      <Card>
        <Switch>
          <Route exact path="/" component={WildPokemon} />
          <Route exact path="/mypokemon" component={MyPokemon} />
        </Switch>
      </Card>
    </PageContainer>
  );
};

export default Main;
