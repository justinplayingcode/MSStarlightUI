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

export enum DepartmentType{
    khambenh = 'BV00KKB01',
    noiTongHop = 'BV00KTH02',
    ngoai = 'BV00KN03',
    canLamSang = 'BV00KCLS04',
    san = 'BV00KS05',
    daLieu = 'BV00KDL06',
    dongY = 'BV00KDY07',
    truyenNhiem = 'BV00KTN08',
    duoc = 'BV00KD09',
    nhi = 'BV00KN10',
    thanNhanTao = 'BV00KTNT11'
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