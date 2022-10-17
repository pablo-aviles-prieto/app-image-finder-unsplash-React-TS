import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPhotos, fetchCategories } from '../components/store/searchSlice';
import { useQuery, checkingForSearchQueryParams } from '../utils';
import {
  MainContainer,
  MainContainerCard,
  GridImages,
  SearchInput,
  SelectAutoComplete,
  SwitchBtn,
} from '../components';

import styles from './Search.module.css';

const colorsInput = [
  'black_and_white',
  'black',
  'white',
  'yellow',
  'orange',
  'red',
  'purple',
  'magenta',
  'green',
  'teal',
  'blue',
];

const orientationInputData = ['landscape', 'portrait', 'squarish'];

export const Search: React.FC = () => {
  const [colorInput, setColorInput] = useState<string | string[]>(['']);
  const [forceFetch, setForceFetch] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [orientationInput, setOrientationInput] = useState<string | string[]>([
    '',
  ]);
  const [orderBySwitch, setOrderBySwitch] = useState(true);
  // const searchInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderByData = {
    trueString: 'relevant',
    falseString: 'latest',
  };

  const queryCategories = useQuery().get('imgscat');
  const queryCategoryName = useQuery().get('catname');
  const queryImgs = useQuery().get('imgs');
  const queryColor = useQuery().get('color');
  const queryOrientation = useQuery().get('orientation');
  const queryOrderBy = useQuery().get('ordered_by');

  useEffect(() => {
    if (queryCategories) {
      dispatch(
        fetchPhotos({
          url: `https://api.unsplash.com/collections/${queryCategories}/photos/?per_page=30&page=1`,
          updateTotalPages: true,
        })
      );
      return;
    }
    let advancedSearchParams;
    if (queryColor || queryOrientation || queryOrderBy) {
      const colorString = !queryColor
        ? ''
        : queryColor == 'null'
        ? ''
        : `&color=${queryColor}`;
      const orientationString = !queryOrientation
        ? ''
        : queryOrientation == 'null'
        ? ''
        : `&orientation=${queryOrientation}`;
      const orderByString = queryOrderBy ? `&ordered_by=${queryOrderBy}` : '';
      advancedSearchParams = colorString + orientationString + orderByString;
    }
    console.log('advancedSearchParams', advancedSearchParams);
    if (queryImgs) {
      const parsedString = queryImgs.trim().replace(/(\s)+/g, '%20');
      dispatch(
        fetchPhotos({
          url: `https://api.unsplash.com/search/photos/?per_page=30&page=1&query=${parsedString}${advancedSearchParams}`,
          updateTotalPages: true,
        })
      );
      return;
    }
    dispatch(
      fetchPhotos({
        url: `https://api.unsplash.com/photos/random/?count=30&page=1${advancedSearchParams}`,
        updateTotalPages: true,
      })
    );
  }, [
    dispatch,
    queryImgs,
    queryCategories,
    queryColor,
    queryOrientation,
    queryOrderBy,
    forceFetch,
  ]);

  const clickImgHandler = (id: string) => {
    console.log('id', id);
  };

  const submitFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    setInputError(false);
    const enteredSearch = inputValue.trim();
    const checkingForColorParam = colorInput ? colorInput[0] : colorInput;
    const checkingForOrientationParam = orientationInput
      ? orientationInput[0]
      : orientationInput;
    if (
      checkingForSearchQueryParams(
        checkingForColorParam,
        checkingForOrientationParam
      ) &&
      !enteredSearch
    ) {
      setInputError(true);
      return;
    }
    const parsedSearch = enteredSearch.replace(/(\s)+/g, '%20');
    const orederedBy = orderBySwitch
      ? orderByData.trueString
      : orderByData.falseString;
    const newUrl = `/search?imgs=${parsedSearch}&color=${colorInput}&orientation=${orientationInput}&ordered_by=${orederedBy}`;
    console.log('newUrl', newUrl);
    !checkingForSearchQueryParams(
      checkingForColorParam,
      checkingForOrientationParam
    ) && setForceFetch((prevState) => !prevState);
    navigate(newUrl);
  };

  const colorInputHandler = (
    e: React.SyntheticEvent,
    value: string | string[]
  ) => {
    setColorInput(value);
  };

  const orientationInputHandler = (
    e: React.SyntheticEvent,
    value: string | string[]
  ) => {
    setOrientationInput(value);
  };

  const orderSwitchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderBySwitch(e.target.checked);
  };

  const divSearchContainerStyles = inputError
    ? `${styles['search-input-container']} ${styles['input-error']}`
    : styles['search-input-container'];

  const titleToDisplay = () => {
    if (queryCategoryName) {
      return `Searching photos from the category: ${queryCategoryName.toUpperCase()}`;
    }
    if (queryImgs) {
      let advancedSearchString = `Searching photos for: ${queryImgs.toUpperCase()}`;
      const checkingForColorOrOrientation = checkingForSearchQueryParams(
        queryColor,
        queryOrientation
      );
      if (checkingForColorOrOrientation) {
        if (queryColor && queryColor !== 'null') {
          advancedSearchString =
            advancedSearchString +
            `, filtered by color: ${queryColor.toUpperCase()}`;
        }
        if (queryOrientation && queryOrientation !== 'null') {
          if (queryColor && queryColor !== 'null') {
            advancedSearchString =
              advancedSearchString +
              ` and by orientation: ${queryOrientation.toUpperCase()}`;
          } else {
            advancedSearchString =
              advancedSearchString +
              `, filtered by orientation: ${queryOrientation.toUpperCase()}`;
          }
        }
      }
      if (queryOrderBy === 'latest') {
        if (checkingForColorOrOrientation) {
          advancedSearchString =
            advancedSearchString + `, and ordered by LATEST`;
        } else {
          advancedSearchString = advancedSearchString + `, ordered by LATEST`;
        }
      }
      return advancedSearchString;
    }
    return `Searching random photos from unsplash`;
  };

  return (
    <>
      <MainContainer sectionTitle={titleToDisplay()}>
        <MainContainerCard>
          <div className={styles['card-form']}>
            <div className={styles['card-form-title']}>
              {!inputError ? (
                <p>
                  Search for images, you can narrow'em down applying filters
                </p>
              ) : (
                <p style={{ color: 'rgb(192, 5, 5)' }}>
                  Can't use the filters without typing any word!
                </p>
              )}
            </div>
            <div className={divSearchContainerStyles}>
              <SearchInput
                placeholderText='Search images...'
                onSubmitFormHandler={submitFormHandler}
              />
            </div>
            <fieldset className={styles['form-container']}>
              <legend>Advanced search</legend>
              <div>
                <SwitchBtn
                  onChangeHandler={orderSwitchHandler}
                  switchState={orderBySwitch}
                  textCases={orderByData}
                />
              </div>
              <div className={styles['grid-input-form']}>
                <SelectAutoComplete
                  onChangeHandler={colorInputHandler}
                  dataArray={colorsInput}
                  textsField={{
                    labelText: 'Filter by color',
                    placeholderText: 'colors...',
                  }}
                />
                <SelectAutoComplete
                  onChangeHandler={orientationInputHandler}
                  dataArray={orientationInputData}
                  textsField={{
                    labelText: 'Filter by orientation',
                    placeholderText: 'types...',
                  }}
                />
              </div>
            </fieldset>
          </div>
        </MainContainerCard>
      </MainContainer>
      <GridImages
        forceBarDisplaying={false}
        onClickImgHandler={clickImgHandler}
      />
    </>
  );
};
