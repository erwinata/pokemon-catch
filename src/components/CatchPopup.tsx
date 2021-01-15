import styled from "@emotion/styled";
import React, { useState } from "react";
import { IPokemon } from "types/IPokemon";
import { capitalizeEachWord } from "utils/strings";
import Button from "./Button";
import Card from "./Card";
import NamingForm from "./NamingForm";
import Pokeball from "./Pokeball";

interface Props {
  exitCatching: () => any;
  pokemon: IPokemon;
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

interface ContentContainerProps {
  opaque?: boolean;
}
const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  transition: 0.3s ease;
  background: ${(props) => (props.opaque ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0)")};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  padding: 1rem 0;
  color: white;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export type TCatchState = "CATCHING" | "SUCCESS" | "FAILED";

const CatchPopup: React.FC<Props> = (props) => {
  const [catchState, setCatchState] = useState<TCatchState>("CATCHING");

  const name = capitalizeEachWord(props.pokemon.name);
  let title = "";
  switch (catchState) {
    case "CATCHING":
      title = "Catching " + name;
      break;
    case "SUCCESS":
      title = name + " Caught!";
      break;
    case "FAILED":
      title = "Failed to catch " + name;
      break;
  }

  const handle = {
    tryAgain: () => {
      setCatchState("CATCHING");
    },
  };

  return (
    <Container>
      <Card maxWidth={400}>
        <ContentContainer opaque={catchState !== "CATCHING"}>
          <Title>{title}</Title>
          <Pokeball pokemon={props.pokemon} catchState={catchState} setCatchState={setCatchState} />
          {catchState === "SUCCESS" && (
            <NamingForm pokemon={props.pokemon} onDone={props.exitCatching} />
          )}
          {catchState === "FAILED" && (
            <ButtonContainer>
              <Button size="lg" color="primary" onClick={handle.tryAgain}>
                Try Again
              </Button>
              <Button onClick={props.exitCatching}>Go Back</Button>
            </ButtonContainer>
          )}
        </ContentContainer>
      </Card>
    </Container>
  );
};

export default CatchPopup;
