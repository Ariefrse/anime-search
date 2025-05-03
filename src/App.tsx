import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import AnimeDetailsPage from './pages/AnimeDetailsPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="/anime/:id" element={<AnimeDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;