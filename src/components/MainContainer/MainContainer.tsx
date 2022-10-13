import React from 'react';
import { SearchInput } from '../SearchInput/SearchInput';

import styles from './MainContainer.module.css';

export const MainContainer: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return (
    <>
      <div className={styles['img-container']}>
        <img
          src={`${process.env.PUBLIC_URL}bground3.jpg`}
          alt='An incredible mountain view'
        />
        <SearchInput />
        {children}
      </div>
      <div className={styles['div-shadow']}></div>
    </>
  );
};
