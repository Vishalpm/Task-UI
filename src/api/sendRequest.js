import axios from "./axios";


export const getRequest = async ({url, auth})=> {
    try{
        const response = await axios.get(url, {
            headers: { Authorization: auth.accessToken },
        });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteRequest = async ({url, auth})=> {
    try{
        const response = await axios.delete(url, {
            headers: { Authorization: auth?.accessToken },
        });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const postRequest = async ({url, auth, payload={}})=> {
    try{
        console.log("asaas", auth);
        const response = await axios.post(url, payload, {
            headers: { Authorization: auth?.accessToken },
        });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const putRequest = async ({url, auth, payload={}})=> {
    try{
        const response = await axios.put(url, payload, {
            headers: { Authorization: auth?.accessToken },
        });
        return response;
    }
    catch(error){
        throw error;
    }
}