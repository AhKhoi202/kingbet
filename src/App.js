import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, KingBet, Tennis } from "./pages";
import { path } from "./utils/constant";
// import KingBet from "./pages/KingBet"; // Giả sử đây là một trang con bạn muốn hiển thị trong Home

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="/*" element={<KingBet />} />
          <Route path={path.TENNIS} element={<Tennis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
