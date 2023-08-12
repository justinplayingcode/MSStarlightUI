export enum accountRole {
    Doctor,
    Patient,
    Admin
}

export enum Gender {
    male, 
    female
}

export enum ApiStatus {
    succes = 0,
    fail = 1
}

export enum ApiStatusCode {
    OK = 200,
    Created = 201,

    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Forbidden = 403,

    ServerError = 500,
}

export enum HealthIndicator {
    HeartRate = 'Nhịp tim',
    Temperature = 'Nhiệt độ cơ thể',
    BloodPressure = 'Huyết áp',
    Glucose = 'Đường huyết'
}

export enum BtnType {
    Default,
    Primary
}

export enum DoctorRank{
    thacSi,
    tienSi,
    PGSTS,
    GSTS,
    none
}

export enum DoctorPosition{
    dean,
    viceDean,
    none
}

export enum PanelType{
    Create,
    Edit,
    View,
    None
}

export enum toastType {
  succes,
  error,
  info,
  warning
}

export enum TypeAppointmentSchedule {
    khamTheoYeuCau,
    khamThuong,
    khamTheoBHYT,
    khamTheoChiDinh,
}

export const MappingTypeAppointmentSchedule: any = {
  [TypeAppointmentSchedule.khamTheoYeuCau]: 'Khám theo yêu cầu',
  [TypeAppointmentSchedule.khamThuong]: 'Khám thường',
  [TypeAppointmentSchedule.khamTheoBHYT]: 'Khám theo BHYT',
  [TypeAppointmentSchedule.khamTheoChiDinh]: 'Khám theo chỉ định',
}

export enum TypeOfTest {
  sinhHoa,
  dongMau,
  huyetHoc,
  nuocTieu,
  sieuAm,
  dienTim,
  chupXQuang,
  chupCT
}

export enum TableType {
  doctorAccount,
  patientAccount,
  medications,
  diseases,
  departments,
  doctorInDepartment,
  scheduleNormal,
  scheduleParaclinical,
  schedulePatientIn, //
  schedulePatientOut, //
  scheduleRequestWaitApprove,
  scheduleRequestApproved,
  scheduleRequestOfPatient,
  approveRequestMedical,
  historyMedicalOfPatient, //
  historyMedicalOfDoctor, //
  scheduleDoneParaclinical
}

export enum DepartmentType {
    tiepDon,
    noiTongHop,
    ngoai,
    canLamSang,
    san,
    daLieu,
    dongY,
    truyenNhiem,
    duoc,
    nhi,
    thanNhanTao,
    capCuu,
    rangHamMat,
    taiMuiHong,
    dinhDuong
}

export enum ScheduleRequestStatus {
  wait,
  accpect,
  reject
}

export enum Onboarding {
  none,
  inpatient,
  outpatient,
}

export enum exportCsvType {
  doctorAccount,
  patientAccount,
  patientIn,
  patientOut,
  historiesMedical,
  manageMedication,
  manageDisease,
}