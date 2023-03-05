import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import ExerciseDetails from "./pages/ExerciseDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box width="400px">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
