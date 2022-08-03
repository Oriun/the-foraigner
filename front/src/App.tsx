import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./views/Desktop/Auth";
import Landing from "./views/Landing";
import { DesignGuidelines } from "@oriun/gray-cat";
import Games from "./views/Desktop/Games";

const App = () => {
  return (
    <Routes>
      <Route path="games/*" element={<Games />} />
    </Routes>
  )
}

const Web = () => {
  return (
    <BrowserRouter>
      <DesignGuidelines />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="auth" element={<Auth />} />
        <Route path="app/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Web;
