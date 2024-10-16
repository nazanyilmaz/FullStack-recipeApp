import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SideBar from "./components/SideBar";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Undefined from "./pages/Undefined";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex ">
        <SideBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipe/:id" element={<DetailPage />} />
          <Route path="/add" element={<CreatePage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/*" element={<Undefined />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
