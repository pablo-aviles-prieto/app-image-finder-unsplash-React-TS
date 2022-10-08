import { Routes, Route } from 'react-router-dom';

import { Welcome } from './components/Welcome/Welcome';
import { NotFound } from './components/NotFound/NotFound';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
