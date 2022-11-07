import { FetchPhotoResults } from './searchSlice';
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
      Authorization: 'Client-ID SOPOVCNGvYl3DOy-4n5LJHUb94oax27VdhZ4g3v1gh0',
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
