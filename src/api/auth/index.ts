import axios from "axios";
import { baseURL } from "..";
import apiClient from "../config/axios";

const api = {
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`
}

const authApi = {
    login: (reqbody) => {
        return axios.post(api.login, reqbody);
    },
    checkCurrentUser: () => apiClient.get(api.checkcurrentuser),
}

export default authApi;