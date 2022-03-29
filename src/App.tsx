import { Route, Routes } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
