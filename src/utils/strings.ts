export const normalizeMoveName = (name: string) => {
  let result = name.replace("-", " ");

  return capitalizeEachWord(result);
};

export const capitalizeEachWord = (text: string) => {
  return text.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
