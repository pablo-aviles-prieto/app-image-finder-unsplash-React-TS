export const gettingPageAndPageNumberFromString = (string: string | null) => {
  return string?.match(/([?]|[\&])page=(\d+)/g);
};

export const gettingNumbersFromString = (string: string | null) => {
  return string?.match(/\d+/);
};

export const replacingPageNumberInLink = (link: string, page: number) => {
  return link.replace(/([?]|[\&])page=(\d+)/g, `&page=${page}`);
};
