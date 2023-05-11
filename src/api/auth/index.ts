import axios from "axios";
import { baseURL } from "..";
import apiClient from "../config/axios";

const api = {
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`,
    getInfoCurrentUser: '/auth/infocurrentuser',
    getAllDoctor: '/account/getalldoctor',
    createDoctor: '/auth/registerdoctor',
    createPatient: '/auth/registerpatient'

}

const authApi = {
    login: (reqbody) => {
        return axios.post(api.login, reqbody);
    },
    //
    checkCurrentUser: () => apiClient.get(api.checkcurrentuser),
    getInfoCurrentUser: () => apiClient.get(api.getInfoCurrentUser),

    //
    getAllDoctor: () => apiClient.get(api.getAllDoctor),
    createDoctor: (reqbody) => {
        return axios.post(api.createDoctor, reqbody)
    },
    createPatient: (reqbody) => {
        return axios.post(api.createPatient, reqbody)
    }
}

export default authApi;