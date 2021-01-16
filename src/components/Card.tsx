import styled from "@emotion/styled";
import React from "react";

interface Props {
  closeAction?: () => any;
  maxWidth?: number;
}

interface ContainerProps {
  maxWidth?: number;
}

const Container = styled.div<ContainerProps>`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  max-width: ${(props) => props.maxWidth + "px" ?? "auto"};
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const CloseButton = styled.div<ContainerProps>`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;
  opacity: 0.3;
  & img {
    width: 32px;
  }
`;

const Card: React.FC<Props> = (props) => {
  return (
    <Container maxWidth={props.maxWidth}>
      {props.closeAction && (
        <CloseButton onClick={props.closeAction}>
          <img src="/x-black.svg" alt="close" />
        </CloseButton>
      )}

      <div>{props.children}</div>
    </Container>
  );
};

export default Card;
