import { commonApi } from "./commonApi";
import { serverURL } from "./serverUrl";

// Helper: Get headers with username
const getUserHeader = () => {
  const user = JSON.parse(sessionStorage.getItem('existingUser'));
  return {
    "Content-Type": "application/json",
    user: JSON.stringify(user)  // Required by middleware
  };
};

// Add Task
export const AddTaskAPI = async (reqBody) => {
  return await commonApi("POST", `${serverURL}/add-task`, reqBody, getUserHeader());
};

// Get Incomplete Tasks
export const GetTaskAPI = async () => {
  return await commonApi("GET", `${serverURL}/get-tasks`, {}, getUserHeader());
};

// Delete Task
export const deleteTasksAPI = async (id) => {
  return await commonApi("DELETE", `${serverURL}/delete-task/${id}`, {}, getUserHeader());
};

// Update Task
export const updateTaskAPI = async (id, reqBody) => {
  return await commonApi("PUT", `${serverURL}/update-task/${id}`, reqBody, getUserHeader());
};

// Complete Task
export const completeTaskAPI = async (id) => {
  return await commonApi("POST", `${serverURL}/complete-task/${id}`, {}, getUserHeader());
};

// Get Completed Tasks
export const GetCompletedAPI = async () => {
  return await commonApi("GET", `${serverURL}/get-completed`, {}, getUserHeader());
};

// Register
export const registerAPI = async (reqBody) => {
  return await commonApi("POST", `${serverURL}/register`, reqBody, {
    "Content-Type": "application/json"
  });
};

// Login
export const loginAPI = async (reqBody) => {
  return await commonApi("POST", `${serverURL}/login`, reqBody, {
    "Content-Type": "application/json"
  });
};
