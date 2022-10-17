import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';

import styles from './SearchInput.module.css';

type Props = {
  placeholderText: string;
  onSubmitFormHandler: (e: React.FormEvent, inputValue: string) => void;
};

export const SearchInput: React.FC<Props> = ({
  placeholderText,
  onSubmitFormHandler,
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
      />
      <button type='submit'>
        <Search />
      </button>
    </form>
  );
};
