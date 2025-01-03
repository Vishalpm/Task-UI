import { endpoints } from "../constants/endpoint";
import { getRequest, deleteRequest, postRequest} from "./sendRequest";

export const showProfileApi = ({auth})=>{
    const url = endpoints.showProfile();
    return getRequest({url, auth});
}

export const registerUrlApi = ({payload})=>{
    const url = endpoints.registerUrl();
    return postRequest({url, payload});
}

export const showAllUsersApi = ({auth})=>{
    const url = endpoints.showAllUsers();
    return getRequest({url, auth});
}

export const searchUserApi = ({auth, payload={}})=>{
    const url = endpoints.searchUser();
    return postRequest({url, auth, payload});
}

export const forgetPasswordAPi = ({payload})=>{
    const url = endpoints.forgetPassword();
    return postRequest({url, payload});
}

export const resetPasswordApi = ({token, payload})=>{
    const url = endpoints.resetPassword(token);
    return postRequest({url, payload});
}

export const loginUrlApi = ({payload})=>{
    const url = endpoints.loginUrl();
    return postRequest({url, payload});
}