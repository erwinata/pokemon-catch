export const getRandomTimeout = () => {
  return Math.random() * 1000 + 1000;
};

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
};
