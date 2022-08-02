import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import Landing from "./views/Landing";
import { DesignGuidelines } from "@oriun/gray-cat";

function App() {
  return (
    <BrowserRouter>
      <DesignGuidelines />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
