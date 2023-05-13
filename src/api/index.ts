import axios from "axios";
import apiClient, { baseURL } from "./config/axios";


const api = {
    //auth
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`,
    getInfoCurrentUser: '/auth/infocurrentuser',

    // account
    createDoctor: '/account/registerdoctor',
    getPatientByInsurance: '/account/searchinsurance', // change
    getAllDoctor: '/account/getalldoctor',
    getAllPatient: '/account/getallpatient',
    
    //healthcare
    createPatient: '/healthcare/registerpatient',


    //department
    getAllDepartment: '/department/getall',

}

const authApi = {
    //only login use axios, other use apiclient
    login: (reqbody) => {
        return axios.post(api.login, reqbody);
    },
    //
    checkCurrentUser: () => apiClient.get(api.checkcurrentuser),
    getInfoCurrentUser: () => apiClient.get(api.getInfoCurrentUser),
}

const accountApi = {
    //
    getAllDoctor: () => apiClient.get(api.getAllDoctor),
    createDoctor: (reqbody) => {
        return apiClient.post(api.createDoctor, reqbody)
    },
    createPatient: (reqbody) => {
        return apiClient.post(api.createPatient, reqbody)
    },
}

const cureProcessApi = {    

    getPatientByInsurance: (reqbody) => {
        return apiClient.post(api.getPatientByInsurance, reqbody);
    }
}

export default {authApi, accountApi, cureProcessApi};
