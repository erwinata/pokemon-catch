import styled from "@emotion/styled";
import Card from "components/Card";
import MyPokemonItem from "components/MyPokemonItem";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext } from "react";

interface Props {}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: fixed;
  top: 75px;
  right: 2.5%;
  width: 95%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  text-align: center;
`;
const ContentContainer = styled.div`
  padding: 0.5rem 0;
  background: rgba(255, 255, 255, 0.8);
`;
const NoDataMessage = styled.h1`
  padding: 3rem 0;
  text-align: center;
  background: white;
  opacity: 0.3;
  font-weight: 600;
  font-size: 1.3rem;
`;
const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  max-height: 60vh;
`;

const MyPokemon: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { showMyPokemon } = useActions(state, dispatch);

  return (
    <Overlay onClick={() => showMyPokemon(false)}>
      <Container>
        <Card>
          <ContentContainer onClick={(e) => e.stopPropagation()}>
            <Title>My Pokemon</Title>
            {state.myPokemon.length === 0 ? (
              <NoDataMessage>
                It's lonely here
                <br /> Go Catch some Pokemon
              </NoDataMessage>
            ) : (
              <PokemonList>
                {state.myPokemon.map((pokemon) => {
                  return <MyPokemonItem data={pokemon} key={pokemon.nickname} />;
                })}
              </PokemonList>
            )}
          </ContentContainer>
        </Card>
      </Container>
    </Overlay>
  );
};

export default MyPokemon;
