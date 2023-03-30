/**
 *
 * Routes for all the games page
 *
 */

import { Routes, Route, Navigate } from "react-router-dom";
import FillInTheGaps from "./atoms/fill-in-the-gaps/fill-in-the-gaps";
const Games = () => {
  return (
      <Routes>
        <Route path="fillInTheGaps/:id" element={< FillInTheGaps />} />
        <Route path="*" element={<Navigate to="fillInTheGaps/1" />} />
      </Routes>
  );
};

export default Games;
