import { endpoints } from "../constants/endpoint";
import { getRequest, deleteRequest, postRequest} from "./sendRequest";

export const createProjectApi = ({payload, auth})=>{
    const url = endpoints.createProject();
    return postRequest({url, auth, payload});
} 


export const showAssignedProjectApi = ({auth})=>{
    const url = endpoints.showAssignedProject();
    return getRequest({url, auth});
}

export const createProjectTaskApi = ({payload, auth})=>{
    const url = endpoints.createProjectTask();
    return postRequest({url, auth, payload});
} 

export const projectWithIdApi = ({auth, projectId})=>{
    const url = endpoints.projectWithId(projectId);
    return getRequest({url, auth});
}

export const addProjectToUserApi = ({auth, projectId})=>{
    const url = endpoints.addProjectToUser(projectId);
    return postRequest({url, auth});
}

export const showAllUserApi = ({auth, projectId})=>{
    const url = endpoints.showAllUser(projectId);
    return postRequest({url, auth});
}