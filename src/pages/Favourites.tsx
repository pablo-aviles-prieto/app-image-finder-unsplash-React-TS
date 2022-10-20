import { useState, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  MainContainer,
  MainContainerCard,
  SearchInput,
  GridImagesMasonry,
  ModalBackdrop,
  ImageInfoModal,
} from '../components';
import {
  setTrueDescriptionReducer,
  addPhotoModalReducer,
  switchModalStateReducer,
} from '../components/store/modalSlice';
import {
  deleteFavedImgReducer,
  updateImgDescription,
} from '../components/store/favouriteSlice';
import { Stack, Chip } from '@mui/material';
import { randomLightColorGenerator } from '../utils';

import styles from './Search.module.css';
import classes from './Favourites.module.css';

interface DummyObj {
  [key: string]: string;
}

const dummyTagObj: DummyObj = {};

export const Favourites: React.FC = () => {
  const [filterTag, setFilterTag] = useState('');
  const [inputValueFilter, setInputValueFilter] = useState('');
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.favourite.tags);
  const favedPhotos = useAppSelector((state) => state.favourite.favedImages);
  const imgDisplayedModal = useAppSelector((state) => state.modal.imgToDisplay);
  const colorArray: string[] = useMemo(
    () => [...randomLightColorGenerator(tags.length)],
    [tags]
  );

  console.log('favedPhotos', favedPhotos);

  const filterClickHandler = (tag: string) => {
    setFilterTag((prevState) => {
      if (prevState === tag) {
        return '';
      }
      return tag;
    });
  };

  const switchModalState = () => {
    dispatch(switchModalStateReducer());
  };

  const clickImgHandler = (id: string, url: string) => {
    const photoObjToFav = favedPhotos.find((photoObj) => photoObj.id === id);
    dispatch(setTrueDescriptionReducer());
    dispatch(
      addPhotoModalReducer({
        imgToDisplay: photoObjToFav,
        url: url,
        state: true,
      })
    );
  };

  const submitModalFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    const checkDuplicity = favedPhotos.find(
      (obj) => obj.id === imgDisplayedModal.id
    );
    const checkNewDescription =
      checkDuplicity?.description === inputValue ? false : true;
    if (checkDuplicity && (!inputValue.trim() || !checkNewDescription)) {
      alert('Insert a new valid description!');
      return;
    }
    if (checkDuplicity && checkNewDescription) {
      alert('Description updated!');
      dispatch(
        updateImgDescription({
          id: imgDisplayedModal.id,
          description: inputValue,
        })
      );
      switchModalState();
      return;
    }
  };

  const deletingPhotoFromSaved = (id: string) => {
    const checkDuplicity = favedPhotos.find(
      (obj) => obj.id === imgDisplayedModal.id
    );
    if (checkDuplicity) {
      dispatch(switchModalStateReducer());
      dispatch(deleteFavedImgReducer(id));
    } else {
      return;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueFilter(e.currentTarget.value.trim());
  };

  const dummySubmitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <MainContainer
        sectionTitle={
          filterTag
            ? `Filtered by ${filterTag.toUpperCase()}`
            : 'Your favourite images!'
        }
      >
        <MainContainerCard>
          <div className={styles['card-form']}>
            <div className={styles['card-form-title']}>
              <p>Search by description your favourited imgs</p>
            </div>
            <div className={styles['search-input-container']}>
              <SearchInput
                placeholderText='Search by description...'
                onSubmitFormHandler={dummySubmitHandler}
                onChangeInputHandler={inputChangeHandler}
              />
            </div>
            <fieldset className={styles['form-container']}>
              <legend>
                {!filterTag
                  ? 'Filter by categories'
                  : `Filtered by ${filterTag}`}
                {filterTag && (
                  <button
                    onClick={() => setFilterTag('')}
                    className={classes['btn-clear-filter']}
                  >
                    CLEAR
                  </button>
                )}
              </legend>
              <div className={classes['category-tags']}>
                <Stack
                  className={classes['category-tags-container']}
                  direction='row'
                  spacing={1}
                >
                  {tags.map((tag: string, index: number) => {
                    dummyTagObj[tag] = colorArray[index];
                    return (
                      <Chip
                        onClick={() => filterClickHandler(tag)}
                        key={tag}
                        clickable
                        label={tag}
                        style={{
                          marginLeft: '0',
                          fontWeight: '700',
                          minWidth: '5rem',
                          backgroundColor: colorArray[index],
                        }}
                      />
                    );
                  })}
                </Stack>
              </div>
            </fieldset>
          </div>
        </MainContainerCard>
      </MainContainer>
      <GridImagesMasonry
        onClickImgHandler={clickImgHandler}
        categoryColorObj={dummyTagObj}
        categorySelected={filterTag}
        inputValueFilter={inputValueFilter}
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
