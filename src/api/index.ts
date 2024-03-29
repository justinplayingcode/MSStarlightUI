import axios from "axios";
import apiClient, { baseURL } from "./config/axios";


const api = {
    //auth
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`,
    getInfoCurrentUser: '/auth/infocurrentuser',
    editPersonalInfo : '/auth/edit',
    changepassword: '/auth/changepassword',
    resetpassword: '/auth/resetpassword',

    // account
    createDoctor: '/account/registerdoctor',
    getAll: '/account/getall',
    changeInfoDoctorByAdmin: '/account/changeinfodoctor',
    getInfoDetail: '/account/detail',
    editAvatar: '/account/uploadavatar',
    avatarToDefault: '/account/defaultavatar',
  
    //healthcare
    getPatientByInsurance: '/healthcare/searchinsurance', // change
    createPatient: '/healthcare/registerpatient',
    getPatientById: '/healthcare/getinfobyuserid',
    getHistoryMedical: '/healthcare/gethistorymedical',
    getPatientsOnBoarding: '/healthcare/getallpatientonbroading',
    getAllTestService: "/healthcare/alltestservice",
    getDetailsMedical: "/healthcare/gethistorymedicaldetails",
    getDetailsPatientWithHitories: "/healthcare/gethistorymedical",
    getBill: "/healthcare/pill",
    
    //department
    getAllDepartment: '/department/getall',
    getAllDoctorInDepartment: '/department/getalldoctors',
    
    //diseases
    getAllDiseases:'/diseases/getall',
    createDiseases: '/diseases/creatediseases',
    editDiseases: '/diseases/editdiseases',
    pickerDiseases: '/diseases/picker',
    
    //pills
    getAllMedication: '/medication/getallmedications',
    createMedication: '/medication/createmedication',
    editMedication: '/medication/editmedication',
    pickerMedication: '/medication/picker',
    
    //schedule
    getWaitedPatient: '/schedule/schedulewait',
    patientGetListRequest: '/schedule/getlistrequestmedical',
    requestSchedule: '/schedule/requestmedical',
    requestAppointmentWait: '/schedule/getallrequestmedical',
    approveRequestMedical: '/schedule/approverequestmedical',
    getListApproveMedical: '/schedule/getallapproverequestmedical',
    startScheduleNormal: '/schedule/startschedulenormal', // xác nhận vào khám
    testingRequest: '/schedule/testingrequest', // yêu cầu đi xét nghiệm
    startTesting: '/schedule/starttesting', // bác sĩ xét nghiệm xác nhận vào khám
    allTestRequest: '/schedule/alltestrequest', // bác sĩ xét nghiệm lấy toàn bộ yêu cầu xét nghiệm
    doneTesting: '/schedule/donetesting',
    done: '/schedule/done', // kết thúc 1 lần khám, chưa viết xong
    doctorRequestSchedule: '/schedule/doctorrequestschedule',

    //statistic
    doctorInDepartment: '/statistic/doctorwithdepartment',
    patientInDepartment: '/statistic/patientsindepartment',
    historieslast7day: '/statistic/historieslast7day',
    onboardinginmonth: '/statistic/onboardinginmonth',
    datanotification: '/statistic/datanotification',
    exportExcel: '/statistic/statisticexcel',

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
    },
    changepassword: (reqbody) => apiClient.put(api.changepassword, reqbody),
    resetpassword: (reqbody) => apiClient.put(api.resetpassword, reqbody),
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
    changeInfoDoctorByAdmin: (reqbody) => apiClient.put(api.changeInfoDoctorByAdmin, reqbody),
    getInfoDetail: (queryString) => apiClient.get(`${api.getInfoDetail}?id=${queryString}`),
    editAvatar: (formData) => apiClient.post(api.editAvatar, formData),
    toDefaultAvatar: () => apiClient.put(api.avatarToDefault)
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
    },
    getPatientsOnBoarding: (reqbody) => apiClient.post(api.getPatientsOnBoarding, reqbody)
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
    },
    pickerDiseases: (reqbody) => apiClient.post(api.pickerDiseases, reqbody)
}

const medicationApi = {
    getAllMedication: (reqbody) => apiClient.post(api.getAllMedication, reqbody),
    createMedication: (reqbody) => {
        return apiClient.post(api.createMedication, reqbody)
    },
    editMedication: (reqbody) => {
        return apiClient.put(api.editMedication, reqbody)
    },
    pickerMedication: (reqbody) => apiClient.post(api.pickerMedication, reqbody)
}

const scheduleApi = {
  patientGetListScheduleRequest: (reqbody) => apiClient.post(api.patientGetListRequest, reqbody),
  requestSchedule: (reqbody) => apiClient.post(api.requestSchedule, reqbody),
  requestAppopintmentWait: (reqbody) => apiClient.post(api.requestAppointmentWait, reqbody),
  approveRequest: (reqbody) => apiClient.put(api.approveRequestMedical, reqbody),
  getListApproveMedical: (reqbody) => apiClient.post(api.getListApproveMedical, reqbody),
  startScheduleNormal: (reqbody) => apiClient.put(api.startScheduleNormal, reqbody),
  getAllTestService: () => apiClient.get(api.getAllTestService),
  testingRequest: (reqbody) => apiClient.put(api.testingRequest, reqbody),
  startTesting: (reqbody) => apiClient.post(api.startTesting, reqbody),
  allTestRequest: (reqbody) => apiClient.post(api.allTestRequest, reqbody),
  doneTesting: (query, reqbody) => apiClient.post(`${api.doneTesting}?id=${query}`, reqbody),
  done: (reqbody) => apiClient.post(api.done, reqbody),
  doctorRequestSchedule: (reqbody) => apiClient.post(api.doctorRequestSchedule, reqbody),
}

const historyMedicalApi = {
  getAllHistoryMedical: (reqbody) => apiClient.post(api.getHistoryMedical, reqbody),
  getDetails: (queryString) => apiClient.get(`${api.getDetailsMedical}?id=${queryString}`),
  getDetailsPatient: (queryString) => apiClient.get(`${api.getDetailsPatientWithHitories}?id=${queryString}`),
  getDetailsBill: (queryString) => apiClient.get(`${api.getBill}?id=${queryString}`),
}

const statisticApi = {
  doctorInDepartment: () => apiClient.get(api.doctorInDepartment),
  patientInDepartment: () => apiClient.get(api.patientInDepartment),
  historieslast7day: () => apiClient.get(api.historieslast7day),
  onboardinginmonth: () => apiClient.get(api.onboardinginmonth),
  datanotification: () => apiClient.get(api.datanotification),
  exportExcel: (queryString) => ({
    api: apiClient.get(`${api.exportExcel}?datasource=${queryString}`),
    url: `${baseURL}${api.exportExcel}?datasource=${queryString}`
  }),
}

const Api = {
    authApi, 
    accountApi, 
    cureProcessApi,
    departmentApi,
    diseasesApi,
    medicationApi,
    scheduleApi,
    historyMedicalApi,
    statisticApi
  };
export default Api;
