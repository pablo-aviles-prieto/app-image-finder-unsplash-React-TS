import { Search } from '@mui/icons-material';

import styles from './SearchInput.module.css';

export const SearchInput: React.FC = () => {
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('check form2');
  };

  return (
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
  );
};
