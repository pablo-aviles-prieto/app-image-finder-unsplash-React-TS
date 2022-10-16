import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchCategories } from '../components/store/searchSlice';
import { useQuery } from '../utils';
import {
  FavedImgsContainer,
  GridImages,
  MainContainer,
  MainContainerCard,
  SearchInput,
} from '../components';

export const LandPage: React.FC = () => {
  // const status = useAppSelector((state) => state.search.status);
  // const photos = useAppSelector((state) => state.search.unsplashList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryCategories = useQuery().get('cats');
  console.log('queryCategories', queryCategories);

  useEffect(() => {
    if (queryCategories) {
      dispatch(
        fetchCategories({
          url: `https://api.unsplash.com/search/collections/?per_page=30&page=1&query=${queryCategories}`,
          updateTotalPages: true,
        })
      );
      return;
    }
    dispatch(
      fetchCategories({
        url: 'https://api.unsplash.com/collections/?per_page=30&page=1',
        updateTotalPages: true,
      })
    );
  }, [dispatch, queryCategories]);

  const clickImgHandler = (id: string) => {
    navigate(`/search?imgscat=${id}`);
  };

  const submitFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    const enteredSearch = inputValue.trim();
    const parsedSearch = enteredSearch.replace(/(\s)+/g, '%20');
    navigate(`/?cats=${parsedSearch}`);
  };

  return (
    <>
      <MainContainer sectionTitle='Browse around this unsplash categories'>
        <>
          <SearchInput
            placeholderText='Search categories...'
            onSubmitFormHandler={submitFormHandler}
          />
          <MainContainerCard>
            <FavedImgsContainer />
          </MainContainerCard>
        </>
      </MainContainer>
      <GridImages
        forceBarDisplaying={true}
        onClickImgHandler={clickImgHandler}
      />
    </>
  );
};
