import React, { useEffect, useState } from "react";
import CreateTaskForm from "../../components/TaskCreateForm";
import { IoAddOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import Modal from "../../components/Modal/index";
import CreateUser from "../../components/UserCreateForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../redux/TaskService";
import DataTablePrime from "../../components/DataTable";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { ToastContainer, toast } from "react-toastify";
import { taskColums } from "../../components/utils";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((data) => data?.tasks);

  const [isAddTask, setIsAddTask] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  function onClose() {
    if (isAddTask) {
      setIsAddTask(false);
    } else {
      setIsAddUser(false);
    }
  }

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <div>
      <div className="shadow-md bg-white p-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsAddTask(true)}
            className="bg-blue-950 mr-2 flex items-center p-2 text-xl text-white rounded-md"
          >
            <span>
              {" "}
              <IoAddOutline className="p-2 w-14 h-14" />
            </span>
            <p>Add Task</p>
          </button>
          <button
            onClick={() => setIsAddUser(true)}
            className="bg-blue-950 flex text-xl items-center p-2 text-white rounded-md"
          >
            <span>
              {" "}
              <CiUser className="p-2 w-14 h-14" />
            </span>
            <p>Add User</p>
          </button>
        </div>
      </div>
      <Modal
        isOpen={isAddTask || isAddUser}
        onClose={onClose}
        title={isAddTask ? "Add task" : "Add user"}
        children={
          isAddTask ? (
            <CreateTaskForm onClose={onClose} />
          ) : (
            <CreateUser onClose={onClose} />
          )
        }
      />
      <div className="p-2 bg-white mt-3">
        <PrimeReactProvider>
          <DataTablePrime data={data} colums={taskColums} />
        </PrimeReactProvider>
      </div>
    </div>
  );
};

export default Dashboard;
