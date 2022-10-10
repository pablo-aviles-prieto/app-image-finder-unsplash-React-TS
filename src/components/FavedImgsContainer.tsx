import React from 'react';
import { Search } from '@mui/icons-material';
import { ImgSlider } from './ImgSlider';

import styles from './FavedImgsContainer.module.css';

export const FavedImgsContainer: React.FC = () => {
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles['img-container']}>
        <img
          src={`${process.env.PUBLIC_URL}bground.jpg`}
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
        <div className={styles['faved-imgs-container']}>
          <p>Faved images</p>
          <ImgSlider />
        </div>
      </div>
      <div className={styles['div-shadow']}></div>
    </>
  );
};
