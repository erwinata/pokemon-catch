import styled from "@emotion/styled";
import React from "react";

interface Props {
  src: string;
  alt: string;
  withoutBackground?: boolean;
}

interface ContainerProps {
  withoutBackground?: boolean;
}
const Container = styled.div<ContainerProps>`
  ${(props) => !props.withoutBackground && `background: rgba(45, 50, 104, 0.13);`}
  border-radius: 100%;
  width: 100%;
  & img {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: 100%;
  }
  & > img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const PokemonImage: React.FC<Props> = (props) => {
  return (
    <Container withoutBackground={props.withoutBackground}>
      <ImageContainer>
        <img src={props.src} alt={props.alt} data-testid="pokemon-image" />
      </ImageContainer>
    </Container>
  );
};

export default PokemonImage;
