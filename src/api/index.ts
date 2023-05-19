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
    getWaitPatient: '/healthcare/getallpatient',
    getPatientById: '/healthcare/getinfobyuserid',


    //department
    getAllDepartment: '/department/getall',

    //diseases
    getAllDiseases: '/diseases/getalldiseases',

    //medication
    getAllMedication: '/medication/getallmedications',


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

    getAllPatient: () => apiClient.get(api.getAllPatient),
    createPatient: (reqbody) => {
        return apiClient.post(api.createPatient, reqbody)
    },
}

const cureProcessApi = {    

    getPatientByInsurance: (reqbody) => {
        return apiClient.post(api.getPatientByInsurance, reqbody);
    },
    getWaitPatient: (reqbody) => {
        return apiClient.post(api.getWaitPatient, reqbody);
    },
    getPatientById: (reqbody) => {
        return apiClient.post(api.getPatientById, reqbody);
    }
}

const departmentApi = {
    getAllDepartment: () => apiClient.get(api.getAllDepartment),
}

const diseasesApi = {
  getAllDiseases: () => apiClient.get(api.getAllDiseases)
}

const medicationApi = {
  getAllMedication: () => apiClient.get(api.getAllMedication)
}


const Api = {
  authApi, 
  accountApi, 
  cureProcessApi,
  departmentApi,
  diseasesApi,
  medicationApi
};
export default Api;
