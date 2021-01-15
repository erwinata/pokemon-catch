import styled from "@emotion/styled";
import Card from "components/Card";
import Navbar from "components/Navbar";
import React from "react";
import { Route, Switch } from "react-router-dom";
import MyPokemon from "./MyPokemon";
import WildPokemon from "./WildPokemon";

interface Props {}

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const Main: React.FC<Props> = (props) => {
  return (
    <PageContainer>
      <Card>
        <Navbar />
        <Switch>
          <Route exact path="/" component={WildPokemon} />
          <Route exact path="/mypokemon" component={MyPokemon} />
        </Switch>
      </Card>
    </PageContainer>
  );
};

export default Main;
