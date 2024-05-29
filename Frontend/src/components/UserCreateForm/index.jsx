import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAUser } from "../../redux/UserServices";

const CreateUser = ({ onClose }) => {
  const dispatch = useDispatch();
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addAUser({ firstName, lastName, email, designation }));
    // Logic to handle form submission (e.g., sending data to server)
    console.log("Form submitted:", { firstName, lastName, email, designation });
    // Clear form fields after submission
    onClose();
    setFirstName("");
    setLastName("");
    setEmail("");
    setDesignation("");
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700"
          >
            Designation
          </label>
          <input
            type="text"
            id="designation"
            className="mt-1 p-2 w-full border-2 border-gray-300 rounded-md"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-950 text-white py-2 px-4 rounded-md  w-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
