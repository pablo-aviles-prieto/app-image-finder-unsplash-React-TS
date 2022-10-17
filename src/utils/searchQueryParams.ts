export const checkingForSearchQueryParams = (
  queryParam1: string,
  queryParam2: string
) => {
  return queryParam1 || queryParam2 ? true : false;
};
