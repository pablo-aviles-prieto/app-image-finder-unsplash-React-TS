import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchPhotosCategories } from '../components/store/searchSlice';
import {
  FavedImgsContainer,
  GridImages,
  MainContainer,
  MainContainerCard,
} from '../components';

export const LandPage: React.FC = () => {
  // const status = useAppSelector((state) => state.search.status);
  // const photos = useAppSelector((state) => state.search.photoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPhotosCategories('https://api.unsplash.com/collections/?per_page=30')
    );
  }, [dispatch]);

  return (
    <>
      <MainContainer sectionTitle='Browse around this unsplash categories'>
        <MainContainerCard>
          <FavedImgsContainer />
        </MainContainerCard>
      </MainContainer>
      <GridImages forceBarDisplaying={true} />
    </>
  );
};
