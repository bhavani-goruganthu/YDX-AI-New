import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import YDXHome from './pages/YDXHome';
import PageNotFound from './pages/PageNotFound';
import './assets/css/index.css';
import { ToastContainer, toast, Zoom } from 'react-toastify'; // for toast messages
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:youtubeVideoId/:userId" element={<YDXHome />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        className="toast-btn"
        position="top-center"
        autoClose={4000}
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
};

export default App;
