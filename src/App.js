import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import YDXHome from './pages/YDXHome';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:videoId/:userId" element={<YDXHome />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
