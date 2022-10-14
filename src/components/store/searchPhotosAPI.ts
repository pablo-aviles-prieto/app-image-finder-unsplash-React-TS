import { FetchPhotoResults } from './searchSlice';

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
  return response.json();
};

export const searchCategoriesAPI: (url: string) => Promise<any[]> = async (
  url
) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID npSG8DeRNQsPiJv00JjJfo6d_hN-n47wb4yWQ8sjTcs',
    },
  });
  if (!response.ok) {
    throw new Error('Fetching the photos failed!!');
  }
  return response.json();
};
