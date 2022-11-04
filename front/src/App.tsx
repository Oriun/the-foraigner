import React , {useCallback} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./views/Desktop/Auth";
import Landing from "./views/Landing";
import { DesignGuidelines } from "@oriun/gray-cat";
import Games from "./views/Desktop/Games";
import FlashCardMob from "./views/Mobile/FlashCard"
import Dropzonetest from './views/Desktop/testDrag'

// import FlashCard from "./views/Desktop/FlashCard"


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
        <Route path="app/*" element={<App />} />
        <Route path="flashcard" element={<FlashCardMob />} />
        <Route path="testDrag" element={<Dropzonetest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Web;
