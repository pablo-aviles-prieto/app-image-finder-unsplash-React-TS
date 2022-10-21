import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPhotos } from '../components/store/searchSlice';
import {
  addImgToFavReducer,
  deleteFavedImgReducer,
} from '../components/store/favouriteSlice';
import {
  addPhotoModalReducer,
  switchModalStateReducer,
  setFalseDescriptionReducer,
} from '../components/store/modalSlice';
import { useQuery, checkingForSearchQueryParams } from '../utils';
import {
  MainContainer,
  MainContainerCard,
  GridImages,
  SearchInput,
  SelectAutoComplete,
  SwitchBtn,
  ModalBackdrop,
  ImageInfoModal,
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

const dummyInputHandler = () => {};

export const Search: React.FC = () => {
  const [colorInput, setColorInput] = useState<string | string[]>(['']);
  const [forceFetch, setForceFetch] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [orientationInput, setOrientationInput] = useState<string | string[]>([
    '',
  ]);
  const [orderBySwitch, setOrderBySwitch] = useState(true);
  const [pageState, setPageState] = useState('1');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const photoList = useAppSelector((state) => state.search.unsplashData);
  const favedImgs = useAppSelector((state) => state.favourite.favedImages);
  const imgDisplayedModal = useAppSelector((state) => state.modal.imgToDisplay);

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
  const queryPage = useQuery().get('page');

  useEffect(() => {
    if (queryCategories) {
      dispatch(
        fetchPhotos({
          url: `https://api.unsplash.com/collections/${queryCategories}/photos/?per_page=30&page=${
            queryPage ? queryPage : '1'
          }`,
          updateTotalPages: true,
        })
      );
      setPageState(queryPage ? queryPage : '1');
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
      const orderByString = queryOrderBy ? `&order_by=${queryOrderBy}` : '';
      advancedSearchParams = colorString + orientationString + orderByString;
    }
    if (queryImgs) {
      const parsedString = queryImgs.trim().replace(/(\s)+/g, '%20');
      dispatch(
        fetchPhotos({
          url: `https://api.unsplash.com/search/photos/?per_page=30&page=${
            queryPage ? queryPage : '1'
          }&query=${parsedString}${advancedSearchParams}`,
          updateTotalPages: true,
        })
      );
      setPageState(queryPage ? queryPage : '1');
      return;
    }
    dispatch(
      fetchPhotos({
        url: `https://api.unsplash.com/photos/random/?count=30&page=1${advancedSearchParams}`,
        updateTotalPages: true,
      })
    );
    setPageState(queryPage ? queryPage : '1');
  }, [
    dispatch,
    queryImgs,
    queryCategories,
    queryColor,
    queryOrientation,
    queryOrderBy,
    forceFetch,
    queryPage,
    setPageState,
  ]);

  const pageChangeHandler = (page: number) => {
    setPageState(`${page}`);
  };

  const switchModalState = () => {
    dispatch(switchModalStateReducer());
  };

  const clickImgHandler = (id: string, url: string) => {
    const checkDuplicity = favedImgs.find((obj) => obj.id === id);
    if (checkDuplicity) {
      dispatch(setFalseDescriptionReducer());
      dispatch(
        addPhotoModalReducer({
          imgToDisplay: checkDuplicity,
          url: url,
          state: true,
        })
      );
      return;
    }
    const photoObjToFav = photoList.parsedArray.find(
      (photoObj) => photoObj.id === id
    );
    dispatch(setFalseDescriptionReducer());
    dispatch(
      addPhotoModalReducer({
        imgToDisplay: photoObjToFav,
        url: url,
        state: true,
      })
    );
  };

  const clickFavIconHandler = (id: string) => {
    const photo = photoList.parsedArray.find((objPhoto) => objPhoto.id === id);
    alert('Image saved to my photos!');
    dispatch(addImgToFavReducer(photo));
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

    !checkingForSearchQueryParams(
      checkingForColorParam,
      checkingForOrientationParam
    ) && setForceFetch((prevState) => !prevState);
    navigate(newUrl);
  };

  const submitModalFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    const checkDuplicity = favedImgs.find(
      (obj) => obj.id === imgDisplayedModal.id
    );

    if (checkDuplicity) {
      alert('Photo already saved in favs!');
      switchModalState();
      return;
    }

    const enteredDescription = inputValue;
    if (enteredDescription.trim()) {
      const newObj = { ...imgDisplayedModal };
      newObj.description = enteredDescription;
      alert('Image with description saved to my photos!');
      dispatch(addImgToFavReducer(newObj));
      switchModalState();
    } else {
      alert('Image saved to my photos!');
      dispatch(addImgToFavReducer(imgDisplayedModal));
      switchModalState();
    }
  };

  const deletingPhotoFromSaved = (id: string) => {
    const checkDuplicity = favedImgs.find(
      (obj) => obj.id === imgDisplayedModal.id
    );
    if (checkDuplicity) {
      dispatch(deleteFavedImgReducer(id));
    } else {
      return;
    }
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

  const divSearchContainerStyles = inputError
    ? `${styles['search-input-container']} ${styles['input-error']}`
    : styles['search-input-container'];

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
                onChangeInputHandler={dummyInputHandler}
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
        pageState={pageState}
        onClickImgHandler={clickImgHandler}
        onClickFavIcon={clickFavIconHandler}
        onPageChange={pageChangeHandler}
      />
      <ModalBackdrop handlingModal={switchModalState}>
        <ImageInfoModal
          onSubmitFormHandler={submitModalFormHandler}
          onDeleteFavBtn={deletingPhotoFromSaved}
        />
      </ModalBackdrop>
    </>
  );
};
