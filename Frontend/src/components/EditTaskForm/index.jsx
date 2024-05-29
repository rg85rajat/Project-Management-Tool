import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDropDownList } from "../../redux/UserServices";
import {
  createATask,
  editATask,
  getATask,
  getAllTasks,
} from "../../redux/TaskService";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
const EditTaskForm = ({ onClose, taskData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State for form fields
  const [taskName, setTaskName] = useState(taskData?.taskName);
  const [taskDescription, setTaskDescription] = useState(taskData?.description);
  const [isUpdated, setIsUpdated] = useState(false);
  const [dueDate, setDueDate] = useState(taskData?.dueDate);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editATask({
        taskId: taskData?._id,
        taskName,
        description: taskDescription,
        dueDate,
      })
    );
    navigate("/");

    // Clear form fields after submission
    onClose();
  };

  console.log(taskDescription, taskName);
  return (
    <div className="bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-8 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              className="mt-1 p-2 w-full border-2 border-black border-solid rounded-md"
              defaultValue={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Task Description
            </label>
            <textarea
              id="taskDescription"
              className="mt-1 p-2 w-full border-2 border-black border-solid rounded-md"
              defaultValue={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>

            <DatePicker
              minDate={new Date()}
              selected={dueDate}
              className="mt-1 p-2 w-full border-2 border-black border-solid rounded-md"
              onChange={(date) => setDueDate(date)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-950 text-white py-2 px-4 rounded-md w-full"
          >
            Edit Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
