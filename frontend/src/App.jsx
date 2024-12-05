import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/common/Auth';
import Sidebar from './components/layout/Sidebar';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-16 p-4">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/league" element={<h1>League Page</h1>} />
          <Route path="/data-science" element={<h1>Data Science Page</h1>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;