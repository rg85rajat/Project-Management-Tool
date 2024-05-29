import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDropDownList } from "../../redux/UserServices";
import { createATask, getAllTasks } from "../../redux/TaskService";
import DatePicker from "react-datepicker";
const CreateTaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.userDropDownList);
  // State for form fields
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskType, setTaskType] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createATask({
        taskName,
        description: taskDescription,
        dueDate,
        assignedTo,
        taskType,
        status: "INPROGRESS",
      })
    );

    // Logic to handle form submission (e.g., sending data to server)
    console.log("Form submitted:", {
      taskName,
      taskDescription,
      assignedTo,
      taskType,
      dueDate,
    });
    // Clear form fields after submission
    onClose();
    setTaskName("");
    setTaskDescription("");
    setAssignedTo("");
    setTaskType("");
    setDueDate("");
  };

  useEffect(() => {
    dispatch(getUsersDropDownList());
  }, []);

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
              value={taskName}
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
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="assignedTo"
              className="block text-sm font-medium text-gray-700"
            >
              Assigned To
            </label>
            <select
              id="assignedTo"
              className="mt-1 p-2 w-full border-2 border-black border-solid rounded-md"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select User</option>
              {users &&
                users.map((user, index) => (
                  <option key={index} value={user?._id}>
                    {user?.firstName + " " + user?.lastName}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="taskType"
              className="block text-sm font-medium text-gray-700"
            >
              Task Type
            </label>
            <input
              type="text"
              id="taskType"
              className="mt-1 p-2 w-full border-2 border-black border-solid rounded-md"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
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
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
