import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { FavedImgsContainer, GridImages } from '../components';
import { fetchPhotosCategories } from '../components/store/searchSlice';

export const LandPage: React.FC = () => {
  // const status = useAppSelector((state) => state.search.status);
  // const photos = useAppSelector((state) => state.search.photoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotosCategories());
  }, [dispatch]);

  return (
    <>
      <FavedImgsContainer />
      <GridImages />
    </>
  );
};
