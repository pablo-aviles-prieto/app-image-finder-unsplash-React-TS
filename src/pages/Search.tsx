import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { MainContainer, MainContainerCard } from '../components';

export const Search: React.FC = () => {
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
      <MainContainer>
        <MainContainerCard>
          <>
            <h1 style={{ color: 'white' }}>Test</h1>
            <h3 style={{ color: 'cyan' }}>Categories: {queryCategories}</h3>
            <h3 style={{ color: 'cyan' }}>Images: {queryImgs}</h3>
          </>
        </MainContainerCard>
      </MainContainer>
    </>
  );
};
