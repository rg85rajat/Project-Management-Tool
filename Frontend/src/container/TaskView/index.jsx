import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteATask, getATask } from "../../redux/TaskService";
import moment from "moment";
import { FaCode } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import Modal from "../../components/Modal";
import EditTaskForm from "../../components/EditTaskForm";
const TaskView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URLParams = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(URLParams.id);
  const { taskView } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (URLParams?.id) {
      dispatch(getATask(URLParams?.id));
    }
  }, [id]);

  function deleteTask(id) {
    dispatch(deleteATask(id));
    navigate("/");
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap mb-5 items-center justify-between">
        <h2 className="text-3xl font-semibold mb-4">{taskView?.taskName}</h2>
        <p className="text-md text-gray-400 font-light  ">
          Created on {moment(taskView?.createdAt).format("MMM Do YYYY")}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-md text-gray-500">{taskView?.description}</p>
        <div className="mt-4 flex items-center">
          <div>
            <p className="font-bold text-black mb-2">Due Date</p>
            <p className="text-md flex items-center">
              <span>
                <FaRegCalendarAlt className="mr-1 w-5 h-5 text-blue-950" />
              </span>
              {moment(taskView?.dueDate).format("Do MMM")}
            </p>
          </div>
          <div className="ml-14">
            <p className="font-bold text-black mb-2">Work Type</p>
            <p className="text-md flex items-center">
              <span>
                <FaCode className="mr-1 w-5 h-5 text-blue-950" />
              </span>
              {taskView?.taskType && taskView?.taskType?.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-1"></div>

      <div className="flex flex-wrap mt-5 items-center justify-between">
        <h2 className="text-3xl font-semibold mb-4">Assignee Details</h2>
        <div className="h-10 w-10 rounded-full bg-blue-950 text-white flex items-center justify-center">
          <span className="text-lg font-semibold">
            {taskView?.assignedTo?.firstName[0]?.toUpperCase()}
            {taskView?.assignedTo?.lastName[0]?.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="mt-2 mb-4">
        <h2 className="text-2xl font-medium">
          {taskView?.assignedTo?.firstName +
            " " +
            taskView?.assignedTo?.lastName}
        </h2>
        <p className="text-md text-gray-400 font-light ">
          {taskView?.assignedTo?.designation}
        </p>
      </div>
      <div>
        <span className="font-bold">Email:</span> {taskView?.assignedTo?.email}
      </div>
      <div className="border-t border-gray-300 mt-1"></div>
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="border-none bg-slate-900 rounded-md p-2 text-white"
        >
          Edit Task
        </button>
        <button
          onClick={() => deleteTask(taskView?._id)}
          className="border-none bg-red-900 rounded-md p-2 text-white"
        >
          Delete Task
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={"Edit task"}
        children={<EditTaskForm onClose={onClose} taskData={taskView} />}
      />
    </div>
  );
};

export default TaskView;
