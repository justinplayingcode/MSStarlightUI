import axios from "axios";
import apiClient, { baseURL } from "./config/axios";


const api = {
    //auth
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`,
    getInfoCurrentUser: '/auth/infocurrentuser',
    editPersonalInfo : '/auth/edit',

    // account
    createDoctor: '/account/registerdoctor',
    getAll: '/account/getall',
    
    //healthcare
    getPatientByInsurance: '/healthcare/searchinsurance', // change
    createPatient: '/healthcare/registerpatient',
    getWaitedPatient: '/schedule/schedulewait',
    getPatientById: '/healthcare/getinfobyuserid',


    //department
    getAllDepartment: '/department/getall',

    //diseases
    getAllDiseases:'/diseases/getalldiseases',
    createDiseases: '/diseases/creatediseases',
    editDiseases: '/diseases/editdiseases',
    
    //pills
    getAllMedication: '/medication/getallmedications',
    createMedication: '/medication/createmedication',
    editMedication: '/medication/editmedication'

}

const authApi = {
    //only login use axios, other use apiclient
    login: (reqbody) => {
        return axios.post(api.login, reqbody);
    },
    //
    checkCurrentUser: () => apiClient.get(api.checkcurrentuser),
    getInfoCurrentUser: () => apiClient.get(api.getInfoCurrentUser),
    editPersonalInfo: (reqbody) => {
        return apiClient.post(api.editPersonalInfo, reqbody)
    }
}

const accountApi = {
    //
    getAll: (reqbody) => apiClient.post(api.getAll, reqbody),
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
    },
    getWaitedPatient: (reqbody) => {
        return apiClient.post(api.getWaitedPatient, reqbody);
    },  
    getPatientById: (reqbody) => {
        return apiClient.post(api.getPatientById, reqbody);
    }
}

const departmentApi = {
    getAllDepartment: () => apiClient.get(api.getAllDepartment),
}

const diseasesApi = {
    getAllDiseases: () => apiClient.get(api.getAllDiseases),
    createDiseases: (reqbody) => {
        return apiClient.post(api.createDiseases,reqbody)
    },
    editDiseases: (reqbody) => {
        return apiClient.post(api.editDiseases,reqbody)
    }
}

const medicationApi = {
    getAllMedication: () => apiClient.get(api.getAllMedication),
    createMedication: (reqbody) => {
        return apiClient.post(api.createMedication, reqbody)
    },
    editMedication: (reqbody) => {
        return apiClient.post(api.editMedication, reqbody)
    }
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
