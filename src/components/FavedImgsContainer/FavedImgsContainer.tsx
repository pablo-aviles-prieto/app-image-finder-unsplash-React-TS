import React from 'react';
import {
  Search,
  ImageSearch,
  Favorite,
  Image,
  ArrowRight,
} from '@mui/icons-material';
import { ImgSlider } from '../';

import styles from './FavedImgsContainer.module.css';

export const FavedImgsContainer: React.FC = () => {
  const hasFavImgs = true;

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles['img-container']}>
        <img
          src={`${process.env.PUBLIC_URL}bground3.jpg`}
          alt='An incredible mountain view'
        />
        <form onSubmit={submitFormHandler} className={styles.form}>
          <input
            type='text'
            name='search'
            placeholder='Search images...'
            defaultValue=''
          />
          <button type='submit'>
            <Search />
          </button>
        </form>
        {hasFavImgs ? (
          <div className={styles['faved-imgs-container']}>
            <p>Your fav'ed images</p>
            <ImgSlider />
          </div>
        ) : (
          <div className={styles['faved-imgs-container']}>
            <div className={styles['no-faved-imgs']}>
              <h2>You can search and save your favorite images!</h2>
              <p>Your favorited images will be showcased right here</p>
              <div className={styles['no-faved-imgs-icons']}>
                <ImageSearch
                  sx={{
                    width: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    height: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  }}
                />
                <ArrowRight />
                <Favorite
                  sx={{
                    width: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    height: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  }}
                />
                <ArrowRight />
                <Image
                  sx={{
                    width: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    height: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles['div-shadow']}></div>
    </>
  );
};
