// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const env = require("dotenv");
env.config();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*", // Replace with your allowed origin(s)
  })
);
// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    designation: String,
    email: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// Define Task Schema
const taskSchema = new mongoose.Schema(
  {
    taskName: String,
    description: String,
    dueDate: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskType: String,
    status: { type: String, enum: ["INPROGRESS", "DONE"] },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);

app.use(bodyParser.json());

// API to create a user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to create a task
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignedTo",
      "firstName lastName email"
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// server.js

// Existing code...

// API to update a user
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET endpoint to retrieve a single task by ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate("assignedTo");

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// API to update a task
app.put("/api/task/:id", async (req, res) => {
  try {
    // Extracting only the fields that should be updated
    const { taskName, description, dueDate } = req.body;
    console.log(taskName, description, dueDate, req.params.id);
    // Constructing the update object with only the specified fields
    const updateFields = {};
    if (taskName) updateFields.taskName = taskName;
    if (description) updateFields.description = description;
    if (dueDate) updateFields.dueDate = dueDate;

    // Finding and updating the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Existing code...
// API to get only username and id of all users
app.get("/api/dropdownuserlist", async (req, res) => {
  try {
    const users = await User.find({}, { firstName: 1, lastName: 1, _id: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    console.log(task, req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({
      message: task,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
