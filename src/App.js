import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AddLocation from "./pages/AddLocation";
import Start from "./pages/Start";
import { CoworkerIdContext } from "./contexts/coworkerContext";
import PrintQr from "./pages/PrintQr";

function App() {
  const [coworkerId, setCoworkerId] = useState(false);

  return (
    <CoworkerIdContext.Provider value={{ coworkerId, setCoworkerId }}>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/start/:check/:locationId" element={<LandingPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/print/:location" element={<PrintQr />} />
          <Route path="/admin/add-location" element={<AddLocation />} />
        </Routes>
      </BrowserRouter>
    </CoworkerIdContext.Provider>
  );
}

export default App;
