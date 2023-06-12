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
    getPatientById: '/healthcare/getinfobyuserid',
    
    
    //department
    getAllDepartment: '/department/getall',
    getAllDoctorInDepartment: '/department/getalldoctors',
    
    //diseases
    getAllDiseases:'/diseases/getall',
    createDiseases: '/diseases/creatediseases',
    editDiseases: '/diseases/editdiseases',
    
    //pills
    getAllMedication: '/medication/getall',
    createMedication: '/medication/createmedication',
    editMedication: '/medication/editmedication',
    
    //schedule
    getWaitedPatient: '/schedule/schedulewait',
    patientGetListRequest: '/schedule/getlistrequestmedical',
    requestSchedule: '/schedule/requestmedical',
    requestAppointmentWait: '/schedule/getallrequestmedical',
    approveRequestMedical: '/schedule/approverequestmedical',


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
        return apiClient.put(api.editPersonalInfo, reqbody)
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
    getAllDepartmentForTable: (reqbody) => apiClient.post(api.getAllDepartment, reqbody),
    getAllDoctorInDepartment: (reqbody) => apiClient.post(api.getAllDoctorInDepartment, reqbody)
}

const diseasesApi = {
    getAllDiseases: (reqbody) => apiClient.post(api.getAllDiseases, reqbody),
    createDiseases: (reqbody) => {
        return apiClient.post(api.createDiseases,reqbody)
    },
    editDiseases: (reqbody) => {
        return apiClient.put(api.editDiseases,reqbody)
    }
}

const medicationApi = {
    getAllMedication: (reqbody) => apiClient.post(api.getAllMedication, reqbody),
    createMedication: (reqbody) => {
        return apiClient.post(api.createMedication, reqbody)
    },
    editMedication: (reqbody) => {
        return apiClient.put(api.editMedication, reqbody)
    }
}

const scheduleApi = {
  patientGetListScheduleRequest: (reqbody) => apiClient.post(api.patientGetListRequest, reqbody),
  requestSchedule: (reqbody) => apiClient.post(api.requestSchedule, reqbody),
  requestAppopintmentWait: (reqbody) => apiClient.post(api.requestAppointmentWait, reqbody),
  approveRequest: (reqbody) => apiClient.put(api.approveRequestMedical, reqbody)
}

const Api = {
    authApi, 
    accountApi, 
    cureProcessApi,
    departmentApi,
    diseasesApi,
    medicationApi,
    scheduleApi,
  };
export default Api;
