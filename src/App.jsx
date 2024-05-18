import React from "react";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Read from "./Pages/Read";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Create />} path="/create" />
        <Route element={<Read />} path="/read/:id" />
      </Routes>
    </>
  );
}

export default App;
