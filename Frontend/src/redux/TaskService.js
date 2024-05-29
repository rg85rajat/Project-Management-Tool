import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAllTasks = createAsyncThunk("getTasks", async () => {
  let { data } = await instance.get("api/tasks");
  return data;
});

export const createATask = createAsyncThunk("createTask", async (taskInfo) => {
  try {
    let { data } = await instance.post("api/tasks", taskInfo);
    return data;
  } catch (error) {
    toast.error(error?.message | "Something went wrong");
  }
});

export const getATask = createAsyncThunk("getTask", async (taskId) => {
  try {
    let { data } = await instance.get(`api/tasks/${taskId}`);
    return data;
  } catch (error) {
    toast.error(error?.message | "Something went wrong");
  }
});

export const deleteATask = createAsyncThunk("deleteTask", async (taskId) => {
  try {
    let { data } = await instance.delete(`api/task/${taskId}`);
    return data;
  } catch (error) {
    toast.error(error?.message | "Something went wrong");
  }
});

export const editATask = createAsyncThunk("editTask", async (taskInfo) => {
  console.log(taskInfo);
  try {
    let { data } = await instance.put(`api/task/${taskInfo?.taskId}`, taskInfo);
    return data;
  } catch (error) {
    toast.error(error?.message | "Something went wrong");
  }
});
