import { createSlice } from "@reduxjs/toolkit";
import {
  createATask,
  deleteATask,
  editATask,
  getATask,
  getAllTasks,
} from "./TaskService";
import { addAUser, getAllUsers, getUsersDropDownList } from "./UserServices";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    taskView: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = action.payload;
    });
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(createATask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createATask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createATask.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(getATask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getATask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.taskView = action?.payload;
    });
    builder.addCase(getATask.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(deleteATask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteATask.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteATask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(editATask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editATask.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(editATask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    userDropDownList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(getUsersDropDownList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersDropDownList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDropDownList = action.payload;
    });
    builder.addCase(getUsersDropDownList.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(addAUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addAUser.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
