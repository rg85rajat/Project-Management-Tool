import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Main from "../components/MainBody";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "../container/DashBoard";
import CreateTaskForm from "../components/TaskCreateForm";
import Users from "../container/ShowUsers";
import { ToastContainer } from "react-toastify";
import { getAllUsers } from "../redux/UserServices";
import { useDispatch } from "react-redux";
import Error from "../components/Error";
import TaskView from "../container/TaskView";

const UIRenderer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}

      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content */}
      <Main isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export const UIRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="dashboard/task" replace={true} />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard/task" replace={true} />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <UIRenderer />,
    errorElement: <Error />,
    children: [
      {
        path: "task",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "user",
        element: <Users />,
        errorElement: <Error />,
      },
      {
        path: "task/:id",
        element: <TaskView />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default UIRenderer;
