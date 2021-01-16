import styled from "@emotion/styled";
import React from "react";

interface Props {}

const Container = styled.div`
  background: rgb(56, 201, 111);
  border-radius: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0.5rem;
  right: 0;
  & img {
    width: 100%;
  }
`;

const CheckCircle: React.FC<Props> = (props) => {
  return (
    <Container>
      <img src="/check.svg" alt="check" />
    </Container>
  );
};

export default CheckCircle;
