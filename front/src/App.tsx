import React, { useCallback } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./views/Desktop/Auth";
import Landing from "./views/Landing";
import { DesignGuidelines } from "@oriun/gray-cat";
import Games from "./views/Desktop/Games";
import Gaps from "./views/Desktop/FillInTheGaps";
import FlashCardMob from "./views/Mobile/FlashCard";
import Dropzonetest from "./views/Desktop/testDrag";
import FlashCard from "./views/Desktop/FlashCard";

import First from "./views/Desktop/Auth/atoms/NewLogin/First";
import Second from "./views/Desktop/Auth/atoms/NewLogin/Second";
import Third from "./views/Desktop/Auth/atoms/NewLogin/Third";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Routes>
      <Route path="games/*" element={<Games />} />
      <Route path="*" element={<Navigate to="games" />} />
      <Route path="lessons/*" element={<Gaps />} />
      <Route path="*" element={<Navigate to="lessons" />} />
    </Routes>
  );
};

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
        <Route path="flashcardMob" element={<FlashCardMob />} />
        {/* <Route path="flashcard" element={<FlashCard />} /> */}
        <Route path="testDrag" element={<Dropzonetest />} />
        <Route path="first" element={<First />} />
        <Route path="second" element={<Second />} />
        <Route path="third" element={<Third />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Web;
