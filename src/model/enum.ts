export enum accountRole {
    Doctor,
    Patient,
    Admin
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
}

export enum HealthIndicator {
    HeartRate = 'Nhịp tim',
    Temperature = 'Nhiệt độ cơ thể',
    BloodPressure = 'Huyết áp',
    Glucose = 'Đường huyết'
}