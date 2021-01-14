const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
};

const mq = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
};

export default mq;
