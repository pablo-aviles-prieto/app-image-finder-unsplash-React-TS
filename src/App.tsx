import { Routes, Route } from 'react-router-dom';
import { NotFound, MainNavigation } from './components';
import { LandPage } from './pages';

import './index.css';

const App: React.FC = () => {
  return (
    <div>
      <MainNavigation>
        <Routes>
          <Route path='/' element={<LandPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainNavigation>
    </div>
  );
};

export default App;
