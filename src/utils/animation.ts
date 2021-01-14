import { keyframes } from "@emotion/react";

export const bounce = keyframes`

53%, 80%, to {
  transform: translate3d(0,0,0);
}

from, 20% {
  transform: translate3d(0, -30px, 0);
}

70% {
  transform: translate3d(0, -15px, 0);
}

90% {
  transform: translate3d(0,-4px,0);
}
`;

export const shake = keyframes`
from, to {
  transform: rotate(0deg);
}

20%, 60% {
  transform: rotate(5deg);
}
40%, 80% {
  transform: rotate(-5deg);
}
`;
