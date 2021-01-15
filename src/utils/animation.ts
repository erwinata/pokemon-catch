import { keyframes } from "@emotion/react";

export const bounce = keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-60px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-10px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
`;

export const shake = keyframes`
from, 30%, 80%, to {
  transform: rotate(0deg);
}

10%, 60% {
  transform: rotate(5deg);
}
20%, 70% {
  transform: rotate(-5deg);
}
`;
