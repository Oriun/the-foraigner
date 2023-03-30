/**
 *
 * Routes for all the games page
 *
 */

import { Routes, Route, Navigate } from "react-router-dom";
import CrossWords from "./atoms/crosswords/CrossWords";


const Games = () => {
  return (
      <Routes>
        <Route path="crosswords/:id" element={<CrossWords />} />
        {/* For demo, redirect to crosswords #1 */}
        <Route path="*" element={<Navigate to="crosswords/62eb1aafd72687d5d6bdd6e5" />} />
      </Routes>
  );
};

export default Games;
