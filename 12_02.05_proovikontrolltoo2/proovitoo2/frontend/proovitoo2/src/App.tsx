import "./App.css";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SingleWord from "./pages/SingleWord";
import EditWord from "./pages/EditWord";
import Parents from "./pages/Parents";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/words/:wordTypeID" element={<SingleWord />} />
        <Route path="/edit-word/:wordTypeID" element={<EditWord />} />
        <Route path="/parents" element={<Parents />} />

        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
