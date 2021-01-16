import styled from "@emotion/styled";
import React from "react";

interface Props {
  src: string;
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

const PokemonImage: React.FC<Props> = (props) => {
  return (
    <Container withoutBackground={props.withoutBackground}>
      <img src={props.src} />
    </Container>
  );
};

export default PokemonImage;
