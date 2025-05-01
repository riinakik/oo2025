import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';

import MainPage from './pages/MainPage';
import Athletes from './pages/Athletes';
import Events from './pages/Events';
import Results from './pages/Results';
import TotalPoints from './pages/TotalPoints';
import SingleAthlete from './pages/SingleAthlete';
import EditResult from './pages/EditResult';

function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/athletes" element={<Athletes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/edit-result/:resultId" element={<EditResult />}/>
        <Route path="/totalpoints" element={<TotalPoints />} />
        <Route path="/athlete/:athleteId" element={<SingleAthlete/>} />


        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
