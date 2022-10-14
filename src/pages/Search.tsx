import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPhotos } from '../components/store/searchSlice';
import { MainContainer, MainContainerCard, GridImages } from '../components';

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (queryImgs) {
      dispatch(
        fetchPhotos(
          `https://api.unsplash.com/search/photos/?per_page=30&query=${queryImgs}`
        )
      );
    }
  }, [dispatch]);

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const queryCategories = useQuery().get('cats');
  const queryImgs = useQuery().get('imgs');
  console.log('queryCategories', queryCategories);
  console.log('queryImgs', queryImgs);

  return (
    <>
      <MainContainer sectionTitle='Search for images or categories'>
        <MainContainerCard>
          <>
            <h1 style={{ color: 'white' }}>Test</h1>
            <h3 style={{ color: 'cyan' }}>Categories: {queryCategories}</h3>
            <h3 style={{ color: 'cyan' }}>Images: {queryImgs}</h3>
          </>
        </MainContainerCard>
      </MainContainer>
      <GridImages forceBarDisplaying={false} />
    </>
  );
};
