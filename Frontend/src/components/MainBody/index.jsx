import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Outlet } from "react-router-dom";
const Main = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-200">
      <div className="shadow-md h-14 flex items-center rounded-md">
        <button className="md:hidden">
          <AiOutlineMenuUnfold onClick={toggleSidebar} className="w-8 h-8" />
        </button>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
