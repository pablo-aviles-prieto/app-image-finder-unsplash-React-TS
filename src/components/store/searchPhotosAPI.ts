export const searchPhotosAPI: () => Promise<any[]> = async () => {
  const response = await fetch('https://api.unsplash.com/photos/?per_page=30', {
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

export const searchCategoriesAPI: () => Promise<any[]> = async () => {
    const response = await fetch('https://api.unsplash.com/collections/?per_page=30', {
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
