import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchCategories } from '../components/store/searchSlice';
import {
  FavedImgsContainer,
  GridImages,
  MainContainer,
  MainContainerCard,
} from '../components';

export const LandPage: React.FC = () => {
  // const status = useAppSelector((state) => state.search.status);
  // const photos = useAppSelector((state) => state.search.unsplashList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchCategories('https://api.unsplash.com/collections/?per_page=30')
    );
  }, [dispatch]);

  const clickImgHandler = (id: string) => {
    navigate(`/search?cat=${id}`);
  };

  return (
    <>
      <MainContainer sectionTitle='Browse around this unsplash categories'>
        <MainContainerCard>
          <FavedImgsContainer />
        </MainContainerCard>
      </MainContainer>
      <GridImages
        forceBarDisplaying={true}
        onClickImgHandler={clickImgHandler}
      />
    </>
  );
};
