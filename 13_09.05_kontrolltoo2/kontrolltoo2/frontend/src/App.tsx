import "./App.css";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import CommentPage from "./pages/CommentPage"; // ⬅️ Õige nimi
import PersonPage from "./pages/PersonPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/comments/:id" element={<CommentPage />} />
        <Route path="/persons" element={<PersonPage />} />
        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
