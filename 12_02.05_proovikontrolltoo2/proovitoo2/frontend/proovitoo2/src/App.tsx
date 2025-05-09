import './App.css';
import { Route, Routes } from 'react-router-dom';


import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
  
        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
