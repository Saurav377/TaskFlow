import { commonApi } from "./commonApi"
import { serverURL } from "./serverUrl"

export const AddTaskAPI = async(reqBody)=>{
    return await commonApi("POST",`${serverURL}/add-task`,reqBody,"")
}

export const GetTaskAPI = async () => {
  return await commonApi("GET", `${serverURL}/get-tasks`, {}, "");
}

export const deleteTasksAPI = async(id,reqHeader) =>{
    return await commonApi("DELETE",`${serverURL}/delete-task/${id}`,{},reqHeader)
}

export const updateTaskAPI = async(id,reqBody,reqHeader) =>{
    return await commonApi("PUT",`${serverURL}/update-task/${id}`,reqBody,reqHeader)
}

export const completeTaskAPI = async (id, reqHeader) => {
    return await commonApi("POST", `${serverURL}/complete-task/${id}`, {}, reqHeader)
}

export const GetCompletedAPI = async () => {
  return await commonApi("GET", `${serverURL}/get-completed`, {}, "");
}