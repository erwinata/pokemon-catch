import styled from "@emotion/styled";
import client from "api/client";
import { queryPokemonDetail, queryPokemonMoves } from "api/queries";
import Button from "components/Button";
import Card from "components/Card";
import ElementType from "components/ElementType";
import MoveItem from "components/MoveItem";
import PokemonImage from "components/PokemonImage";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IMove } from "types/IMove";
import { IPokemon } from "types/IPokemon";
import mq from "utils/mediaqueries";
import { capitalizeEachWord, normalizeMoveName } from "utils/strings";

interface Props {}

interface IParams {
  name: string;
}

const Container = styled.div`
  padding: 1rem 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 0.25rem;
  gap: 0.5rem;
  ${mq.xs} {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  padding: 0 1rem;
  ${mq.xs} {
    width: 30%;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.25rem;
  ${mq.xs} {
    align-items: stretch;
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
  /* flex-direction: column; */
  /* align-items: center; */
  gap: 0.5rem;
  padding: 0.5rem 0;
  ${mq.xs} {
    flex-direction: row;
  }
`;

const Pokemon: React.FC<Props> = (props) => {
  const [pokemonData, setPokemonData] = useState<IPokemon>(undefined!);

  const { name } = useParams<IParams>();
  const history = useHistory();

  const fetchData = async () => {
    const { data: dataPokemon } = await client.query({
      query: queryPokemonDetail,
      variables: {
        name: name,
      },
    });

    const paramsMoves = dataPokemon.pokemon.moves.map((item: any) => {
      return item.move.name;
    });

    const { data: dataMoves } = await client.query({
      query: queryPokemonMoves,
      variables: {
        move1: paramsMoves[0],
        move2: paramsMoves[1],
        move3: paramsMoves[2],
        move4: paramsMoves[3],
      },
    });

    const resultMoves: IMove[] = [];
    for (let i = 1; i <= 4; i++) {
      const data = dataMoves["move" + i].response;
      const newMove: IMove = {
        id: data.id,
        name: normalizeMoveName(data.name),
        pp: data.pp,
        type: data.type.name,
      };
      resultMoves.push(newMove);
    }

    const resultPokemon: IPokemon = {
      name: name,
      id: dataPokemon.pokemon.id,
      moves: resultMoves,
      image: dataPokemon.pokemon.sprites.front_default,
      types: dataPokemon.pokemon.types.map((item: any) => item.type.name),
    };

    setPokemonData(resultPokemon);
  };

  useEffect(() => {
    if (name) {
      fetchData();
    }
  }, [name]);

  const handle = {
    goBack: () => {
      history.push("/");
    },
  };

  return (
    <Container>
      {/* <CatchPopup /> */}
      <Card maxWidth={600} closeAction={handle.goBack}>
        {pokemonData && (
          <>
            <Header>
              <ImageContainer>
                <PokemonImage src={pokemonData.image} />
              </ImageContainer>
              <InfoContainer>
                <Name>{capitalizeEachWord(pokemonData.name)}</Name>
                <TypeContainer>
                  {pokemonData.types.map((item) => (
                    <ElementType type={item} small />
                  ))}
                </TypeContainer>
                <hr />
                <ButtonContainer>
                  <Button color="primary">Catch</Button>
                  <Button>
                    <img src="/pokeball.png" />1
                  </Button>
                </ButtonContainer>
              </InfoContainer>
            </Header>
            <MoveList>
              {pokemonData.moves.map((item) => {
                return <MoveItem data={item} />;
              })}
            </MoveList>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Pokemon;
