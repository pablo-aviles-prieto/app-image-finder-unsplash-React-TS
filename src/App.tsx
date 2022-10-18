import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainNavigation } from './components';
import { LandPage, Search, Favourites } from './pages';
import { useAppDispatch } from './app/hooks';
import { fetchingLocalStorage } from './components/store/favouriteSlice';

import './index.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchingLocalStorage());
  }, []);

  return (
    <div>
      <MainNavigation>
        <Routes>
          <Route path='/' element={<LandPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </MainNavigation>
    </div>
  );
};

export default App;
