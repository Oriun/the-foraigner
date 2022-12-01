import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./views/Desktop/Auth";
import Landing from "./views/Landing";
import { DesignGuidelines } from "@oriun/gray-cat";
import Games from "./views/Desktop/Games";
import First from "./views/Desktop/Auth/atoms/NewLogin/First";
import Second from "./views/Desktop/Auth/atoms/NewLogin/Second";
import Third from "./views/Desktop/Auth/atoms/NewLogin/Third";

const App = () => {
  return (
    <Routes>
      <Route path="games/*" element={<Games />} />
      <Route path="*" element={<Navigate to="games" />} />
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
        <Route path="first" element={<First />} />
        <Route path="second" element={<Second />} />
        <Route path="third" element={<Third />} />
        <Route path="app/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Web;
