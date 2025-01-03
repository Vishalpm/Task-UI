import { endpoints } from "../constants/endpoint";
import { getRequest, deleteRequest, postRequest, putRequest} from "./sendRequest";

export const createTaskApi = ({payload, auth})=>{
    const url = endpoints.createTask();
    return postRequest({url, auth, payload});
} 

export const updateTaskApi = ({taskId, auth, payload={}})=>{
    const url = endpoints.updateTask(taskId);
    return putRequest({url, auth, payload});
}

export const showAllTaskpi = ({auth})=>{
    const url = endpoints.showAllTasks();
    return getRequest({url, auth});
} 

export const deleteTaskApi = ({taskId, auth})=>{
    const url = endpoints.deleteTask(taskId);
    return deleteRequest({url, auth});
} 

export const pendingTasksApi = ({auth})=>{
    const url = endpoints.pendingTasks();
    return getRequest({url, auth});
} 

export const taskWithIdApi = ({auth, taskId})=>{
    const url = endpoints.taskWithId(taskId);
    return getRequest({url, auth});
} 

