export const checkingForSearchQueryParams = (
  queryParam1: string | null,
  queryParam2: string | null
) => {
  return (queryParam1 && queryParam1 !== 'null') ||
    (queryParam2 && queryParam2 !== 'null')
    ? true
    : false;
};
