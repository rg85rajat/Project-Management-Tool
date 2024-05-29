import React, { useState } from "react";
import { LuUsers2 } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav
      className={` bg-gray-800 text-white w-64 flex-none absolute top-0 left-0 bottom-0 z-10 ${
        isSidebarOpen ? "" : "hidden transition-all duration-300"
      } md:relative md:left-0 md:block`}
    >
      <span className={`${isSidebarOpen ? "" : "hidden"}`}>
        <button onClick={() => toggleSidebar()}>
          {" "}
          <ImCross className="text-white" />
        </button>
      </span>
      {/* Sidebar content */}
      <div className="p-4">
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
              <span className="leading-10 text-gray-100 text-2xl font-bold ml-1">
                Task Management
              </span>
            </a>
          </div>
        </div>
        <ul className="flex flex-col w-full">
          <li className="my-px">
            <Link to={"/dashboard/task"}>
              <a className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span className="flex items-center justify-center text-lg text-gray-400">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <span className="ml-3">Dashboard</span>
              </a>
            </Link>
          </li>
          <li className="my-px">
            <Link to={"/dashboard/user"}>
              <a className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span className="flex items-center justify-center text-lg text-gray-400">
                  <LuUsers2 className="h-6 w-6" />
                </span>
                <span className="ml-3">User</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
