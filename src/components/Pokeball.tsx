import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { IPokemon } from "types/IPokemon";
import { bounce, shake } from "../utils/animation";
import { TCatchState } from "./CatchPopup";
import CheckCircle from "./CheckCircle";
import PokemonImage from "./PokemonImage";

interface Props {
  pokemon: IPokemon;
  catchState: TCatchState;
  setCatchState: (catchState: TCatchState) => any;
}

interface ContainerProps {
  animationState: TAnimationState;
  catchState: TCatchState;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 35%;
  height: 150px;
  & > img {
    height: 100%;
    margin: 0 auto;
    position: absolute;
    z-index: 1;
    transition: 0.2s ease;
  }
  & > .pokeball {
    animation: ${(props) => (props.animationState === "BOUNCE" ? bounce : shake)} 1s ease infinite;
    animation-delay: 0.2s;
  }
  & > .pokemon {
    ${(props) => props.catchState === "SUCCESS" && `animation: ${shake} 1.2s ease infinite;`};
    ${(props) => props.catchState === "FAILED" && `opacity: 0.5;`};
  }
`;

const Shadow = styled.div`
  width: 50%;
  height: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  position: relative;
  top: 135px;
`;

export type TAnimationState = "BOUNCE" | "SHAKE";

const Pokeball: React.FC<Props> = (props) => {
  const [animationState, setAnimationState] = useState<TAnimationState>("BOUNCE");

  const animate = async () => {
    setAnimationState("BOUNCE");
    await new Promise((res) => setTimeout(res, 1200));
    setAnimationState("SHAKE");
    await new Promise((res) => setTimeout(res, 2000));
    props.setCatchState(getRandomResult() ? "SUCCESS" : "FAILED");
  };

  const getRandomResult = () => {
    return Math.random() < 0.5;
  };

  useEffect(() => {
    if (props.catchState === "CATCHING") {
      animate();
    }
  }, [props.catchState]);

  return (
    <Container animationState={animationState} catchState={props.catchState}>
      {props.catchState === "SUCCESS" && <CheckCircle />}
      {props.catchState === "CATCHING" ? (
        <>
          <img className="pokeball" src="/pokeball.png" />
          <Shadow />
        </>
      ) : (
        <PokemonImage src={props.pokemon.image} />
      )}
    </Container>
  );
};

export default Pokeball;
