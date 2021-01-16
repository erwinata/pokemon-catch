import styled from "@emotion/styled";
import { apiGetPokemonDetail, apiGetPokemonList } from "api/pokemon";
import Button from "components/Button";
import Card from "components/Card";
import CatchPopup from "components/CatchPopup";
import ElementType from "components/ElementType";
import MoveItem from "components/MoveItem";
import OtherPokemon from "components/OtherPokemon";
import PokemonImage from "components/PokemonImage";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IPokemon } from "types/IPokemon";
import { IPokemonItem } from "types/IPokemonItem";
import mq from "utils/mediaqueries";
import { capitalizeEachWord } from "utils/strings";

interface Props {}

interface IParams {
  name: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 1rem 3rem;
  overflow: hidden;
  gap: 1rem;
`;

const Header = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 0.25rem;
  gap: 0.5rem;
  ${mq.sm} {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  max-width: 200px;
  padding: 0 1rem;
  ${mq.sm} {
    width: 30%;
  }
`;

const InfoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.25rem;
  ${mq.sm} {
    align-items: stretch;
  }
`;

interface ArrowProps {
  direction: "LEFT" | "RIGHT";
}
const Arrow = styled.img<ArrowProps>`
  position: absolute;
  left: ${(props) => (props.direction === "LEFT" ? "1rem" : "auto")};
  right: ${(props) => (props.direction === "RIGHT" ? "1rem" : "auto")};
  top: 2.25rem;
  transform: scale(${(props) => (props.direction === "LEFT" ? "-1" : "1")}, 1);
  opacity: 0.4;
  height: 20px;
  ${mq.sm} {
    display: none;
  }
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MoveList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
  ${mq.sm} {
    flex-direction: row;
  }
`;

const PokemonDetail: React.FC<Props> = (props) => {
  const [pokemonData, setPokemonData] = useState<IPokemon>(undefined!);
  const [prevPokemon, setPrevPokemon] = useState<IPokemonItem>(undefined!);
  const [nextPokemon, setNextPokemon] = useState<IPokemonItem>(undefined!);

  const [isCatching, setIsCatching] = useState(false);

  const { name } = useParams<IParams>();
  const history = useHistory();

  const { state, dispatch } = useContext(AppContext);
  const { showMyPokemon } = useActions(state, dispatch);

  const fetchPokemonDetail = async () => {
    const resultPokemon = await apiGetPokemonDetail(name);

    if (resultPokemon.data) {
      setPokemonData(resultPokemon.data);
    }
  };

  const fetchPrevNextPokemon = async () => {
    setPrevPokemon(undefined!);
    setNextPokemon(undefined!);

    const resultPokemons = await apiGetPokemonList(pokemonData.id - 2, 3);

    if (resultPokemons.data) {
      if (resultPokemons.data[0] !== undefined) {
        setPrevPokemon(resultPokemons.data[0]);
      }
      if (resultPokemons.data[2] !== undefined) {
        setNextPokemon(resultPokemons.data[2]);
      }
    }
  };

  useEffect(() => {
    if (name) {
      fetchPokemonDetail();
    }
  }, [name]);

  useEffect(() => {
    if (pokemonData) {
      fetchPrevNextPokemon();
    }
  }, [pokemonData]);

  const handle = {
    goBack: () => {
      history.push("/");
    },
    exitCatching: () => {
      setIsCatching(false);
    },
    catchPokemon: () => {
      setIsCatching(true);
    },
    openMyPokemon: () => {
      showMyPokemon(true);
    },
    goToOtherPokemon: (direction: "PREV" | "NEXT") => {
      if (direction === "PREV") {
        prevPokemon && history.push("/pokemon/" + prevPokemon.name);
      }
      if (direction === "NEXT") {
        nextPokemon && history.push("/pokemon/" + nextPokemon.name);
      }
    },
  };

  const totalPokemonOwned = state.myPokemon.filter((pokemon) => {
    return pokemon.name === pokemonData?.name;
  }).length;

  return (
    <Container>
      <OtherPokemon data={prevPokemon} onClick={() => handle.goToOtherPokemon("PREV")} />
      {isCatching && <CatchPopup pokemon={pokemonData} exitCatching={handle.exitCatching} />}
      <Card maxWidth={600} closeAction={handle.goBack}>
        {!pokemonData ? (
          <div>Loading...</div>
        ) : (
          <>
            <Header>
              <ImageContainer>
                <PokemonImage src={pokemonData.image} />
              </ImageContainer>
              <InfoContainer>
                <Arrow
                  src="/arrow.svg"
                  direction="LEFT"
                  onClick={() => handle.goToOtherPokemon("PREV")}
                />
                <Arrow
                  src="/arrow.svg"
                  direction="RIGHT"
                  onClick={() => handle.goToOtherPokemon("NEXT")}
                />

                <Name>{capitalizeEachWord(pokemonData.name)}</Name>
                <TypeContainer>
                  {pokemonData.types.map((item, index) => (
                    <ElementType type={item} small key={index} />
                  ))}
                </TypeContainer>
                <hr />
                <ButtonContainer>
                  <Button size="lg" color="primary" onClick={handle.catchPokemon}>
                    Catch
                  </Button>
                  <Button size="lg" onClick={handle.openMyPokemon}>
                    <img src="/pokeball.png" />
                    {totalPokemonOwned}
                  </Button>
                </ButtonContainer>
              </InfoContainer>
            </Header>
            <MoveList>
              {pokemonData.moves.map((item, index) => {
                return <MoveItem data={item} key={index} />;
              })}
            </MoveList>
          </>
        )}
      </Card>
      <OtherPokemon data={nextPokemon} onClick={() => handle.goToOtherPokemon("NEXT")} />
    </Container>
  );
};

export default PokemonDetail;
