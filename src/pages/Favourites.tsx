import { MainContainer, MainContainerCard, SearchInput } from '../components';

import styles from './Search.module.css';

export const Favourites: React.FC = () => {
  const submitFormHandler = () => {};

  return (
    <MainContainer sectionTitle='Your favourite images!'>
      <MainContainerCard>
        <div className={styles['card-form']}>
          <div className={styles['card-form-title']}>
            <p>Search between your saved favourite images</p>
          </div>
          <div className={styles['search-input-container']}>
            <SearchInput
              placeholderText='Search images...'
              onSubmitFormHandler={submitFormHandler}
            />
          </div>
          <fieldset className={styles['form-container']}>
            <legend>Favourite search</legend>
            <div className={styles['grid-input-form']}>
              <h3>test2</h3>
            </div>
          </fieldset>
        </div>
      </MainContainerCard>
    </MainContainer>
  );
};
