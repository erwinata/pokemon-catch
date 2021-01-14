import styled from "@emotion/styled";
import React from "react";

interface Props {
  src: string;
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.025);
  border-radius: 100%;
  width: 100%;
  & img {
    width: 100%;
  }
`;

const PokemonImage: React.FC<Props> = (props) => {
  return (
    <Container>
      <img src={props.src} />
    </Container>
  );
};

export default PokemonImage;
