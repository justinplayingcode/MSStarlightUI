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

export enum TypeOfTest {
    SinhHoa,
    DongMau,
    HuyetHoc,
    NuocTieu,
    SieuAm,
    DienTim,
    XQuang,
    CTScanner
}

export enum TableType {
  doctorAccount,
  patientAccount,
  medications,
  diseases,
  scheduleNormalReception,
  scheduleNormalOtherDepartment,
  scheduleParaclinicalDepartment,
  scheduleNormalOtherDepartmentTesting,
  scheduleWithRequest,
  patientOnboarding,
  schedulePatientIn,
  departments,
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
    thanNhanTao
}