import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFound, MainNavigation } from './components';
import { LandPage, Search, Favourites } from './pages';

import './index.css';

const App: React.FC = () => {
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
