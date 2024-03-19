import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, KingBet, NBA, TableTennis } from "./pages";
import { path } from "./utils/constant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="/*" element={<KingBet />} />
          <Route path={path.NBA} element={<NBA />} />
          <Route path={path.TABLETENNIS} element={<TableTennis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
