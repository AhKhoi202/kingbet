import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex w-full flex-auto">
        <Sidebar className="h-full fixed left-0 top-0 bottom-0 overflow-y-auto" />
        <div className="flex-auto w-full bg-[#f2f6fc] shadow-md overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
