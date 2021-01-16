export const setLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocal = (key: string) => {
  let result: any;
  result = localStorage.getItem(key);
  result = JSON.parse(result);
  return result ? result : false;
};

export const clearLocal = (key: string) => {
  localStorage.removeItem(key);
};

export const clearAllLocal = () => {
  localStorage.clear();
};
