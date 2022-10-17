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
  const photos = useAppSelector((state) => state.search.unsplashData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryCategories = useQuery().get('cats');

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
    const image = photos.parsedArray.filter((obj) => obj.id === id);
    navigate(`/search?imgscat=${id}&catname=${image[0].description}`);
  };

  const submitFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    const enteredSearch = inputValue.trim();
    const parsedSearch = enteredSearch.replace(/(\s)+/g, '%20');
    navigate(`/?cats=${parsedSearch}`);
  };

  console.log('queryCategories', queryCategories);

  const titleToDisplay = queryCategories
    ? `Searching the categories: ${queryCategories}`
    : 'Browse around this unsplash categories';

  return (
    <>
      <MainContainer sectionTitle={titleToDisplay}>
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
