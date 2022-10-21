import React, { useRef } from 'react';
import { Search } from '@mui/icons-material';

import styles from './SearchInput.module.css';

type Props = {
  placeholderText: string;
  onSubmitFormHandler: (e: React.FormEvent, inputValue: string) => void;
  onChangeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: React.FC<Props> = ({
  placeholderText,
  onSubmitFormHandler,
  onChangeInputHandler,
}) => {
  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => onSubmitFormHandler(e, searchInput.current!.value)}
      className={styles.form}
    >
      <input
        type='text'
        name='search'
        placeholder={placeholderText}
        defaultValue=''
        ref={searchInput}
        onChange={(e) => onChangeInputHandler(e)}
      />
      <button type='submit'>
        <Search />
      </button>
    </form>
  );
};
