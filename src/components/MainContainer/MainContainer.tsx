import React from 'react';
import { SearchInput } from '../SearchInput/SearchInput';

import styles from './MainContainer.module.css';

type Props = {
  children: JSX.Element;
  sectionTitle: string;
};

export const MainContainer: React.FC<Props> = ({ children, sectionTitle }) => {
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
      <div className={styles['grid-container-title']}>
        <h2>{sectionTitle}</h2>
      </div>
    </>
  );
};
