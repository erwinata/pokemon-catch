import styled from "@emotion/styled";
import React from "react";
import { spin } from "utils/animation";

interface Props {
  size?: number;
  className?: string;
}

const Container = styled.div`
  color: #8769e0;
  animation: ${spin} 1s linear infinite;
`;

const Spinner: React.FC<Props> = (props) => {
  const size = props.size || 16;
  return (
    <Container
      style={{
        width: size,
        height: size,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.9 22.9">
        <circle
          cx="11.45"
          cy="11.45"
          r="9.95"
          fill="none"
          stroke="#ffffff07"
          strokeMiterlimit="10"
          strokeWidth="3"
        />
        <path
          d="M4.41,4.41a10,10,0,0,0,7,17"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </svg>
    </Container>
  );
};

export default Spinner;
