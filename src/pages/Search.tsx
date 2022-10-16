import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPhotos, fetchCategories } from '../components/store/searchSlice';
import { useQuery } from '../utils';
import {
  MainContainer,
  MainContainerCard,
  GridImages,
  SearchInput,
} from '../components';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const queryCategories = useQuery().get('imgscat');
  const queryImgs = useQuery().get('imgs');

  useEffect(() => {
    if (queryImgs) {
      const parsedString = queryImgs.trim().replace(/(\s)+/g, '%20');
      dispatch(
        fetchPhotos({
          url: `https://api.unsplash.com/search/photos/?per_page=30&page=1&query=${parsedString}`,
          updateTotalPages: true,
        })
      );
      return;
    }
    if (queryCategories) {
      dispatch(
        fetchPhotos({
          url: `https://api.unsplash.com/collections/${queryCategories}/photos/?per_page=30&page=1`,
          updateTotalPages: true,
        })
      );
      return;
    }
    console.log('queryparams', queryImgs);
    dispatch(
      fetchPhotos({
        url: `https://api.unsplash.com/photos/random/?count=30&page=1`,
        updateTotalPages: true,
      })
    );
  }, [dispatch, queryImgs, queryCategories]);

  const clickImgHandler = (id: string) => {
    console.log('id', id);
  };

  const submitFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    const enteredSearch = inputValue.trim();
    const parsedSearch = enteredSearch.replace(/(\s)+/g, '%20');
    navigate(`/search?imgs=${parsedSearch}`);
  };

  return (
    <>
      <MainContainer sectionTitle='Search for images or categories'>
        <MainContainerCard>
          <>
            <div>
              <h1 style={{ color: 'white' }}>
                Search between categories or images switching the button
              </h1>
            </div>
            <div>
              <SearchInput
                placeholderText='Search images...'
                onSubmitFormHandler={submitFormHandler}
              />
            </div>
            <div>
              <br />
              <h3 style={{ color: 'cyan' }}>Categories: {queryCategories}</h3>
              <h3 style={{ color: 'cyan' }}>Images: {queryImgs}</h3>
            </div>
          </>
        </MainContainerCard>
      </MainContainer>
      <GridImages
        forceBarDisplaying={false}
        onClickImgHandler={clickImgHandler}
      />
    </>
  );
};
