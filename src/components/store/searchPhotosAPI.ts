import { FetchPhotoResults, FetchPhotoData } from './searchSlice';
import {
  gettingPageAndPageNumberFromString,
  gettingNumbersFromString,
} from '../../utils/regex';

export const searchPhotosAPI: (
  url: string
) => Promise<FetchPhotoResults> = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID npSG8DeRNQsPiJv00JjJfo6d_hN-n47wb4yWQ8sjTcs',
    },
  });
  if (!response.ok) {
    throw new Error('Fetching the photos failed!!');
  }

  const linkHeaders = response.headers?.get('link');
  const pagesInHeaders = gettingPageAndPageNumberFromString(linkHeaders);
  let numbersFromThePages = pagesInHeaders?.map((link) =>
    gettingNumbersFromString(link)
  );
  if (!numbersFromThePages) {
    (numbersFromThePages as unknown as number[]) = [0];
  }
  const biggestPageNumber = Math.max.apply(
    0,
    numbersFromThePages as unknown as number[]
  );

  return { responseObj: response.json(), numbersOfPages: biggestPageNumber };
};

export const searchCategoriesAPI: (
  url: string
) => Promise<FetchPhotoResults> = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID npSG8DeRNQsPiJv00JjJfo6d_hN-n47wb4yWQ8sjTcs',
    },
  });
  if (!response.ok) {
    throw new Error('Fetching the photos failed!!');
  }

  const linkHeaders = response.headers?.get('link');
  const pagesInHeaders = linkHeaders?.match(/([?]|[\&])page=(\d+)/g);
  let numbersFromThePages = pagesInHeaders?.map((link) => link.match(/\d+/));
  if (!numbersFromThePages) {
    (numbersFromThePages as unknown as number[]) = [0];
  }
  const biggestPageNumber = Math.max.apply(
    0,
    numbersFromThePages as unknown as number[]
  );

  return { responseObj: response.json(), numbersOfPages: biggestPageNumber };
};
