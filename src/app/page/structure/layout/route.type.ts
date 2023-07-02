
export interface IRouteItem {
    key: string;
    text: string;
    url?: string;
    iconName?:string;
    parentKeys?: string[]
}

export const routeMapping : {[key: string]: IRouteItem} = {
    Home: {
        key: "route-home",
        text: 'Tổng quát',
        url: '/',
        iconName: 'fas-house'
    },
    PatientManagement: {
        key: 'route-patient-management',
        text: 'Quản lý tài khoản bệnh nhân',
        url: '/patient-management',
    },
    PatientDetails: {
      key: 'route-patient-management-details',
      text: 'Thông tin bệnh nhân',
      url: '/patient-management/patient-details',
      parentKeys:["route-patient-management"]
    },
    DoctorManagement: {
        key: 'route-doctor-management',
        text: 'Quản lý tài khoản bác sĩ',
        url: '/doctor-management',
    },
    DoctorDetails: {
        key: 'route-doctor-management-details',
        text: 'Thông tin bác sĩ',
        url: '/doctor-management/doctor-details',
        parentKeys:["route-doctor-management"]
    },
    PatientManagementDoctor: {
        key: 'route-patient-management-doctor',
        text: 'Quản lý bệnh nhân',
        url: '/patient-management-doctor',
    },
    Speciallity: {
        key: 'route-speciality',
        text: 'Quản lý các khoa',
        url: '/speciality',
    },
    SpeciallityDoctors: {
      key: 'route-speciality-doctors',
      text: 'Danh sách bác sĩ',
      url: '/speciality/doctors',
      parentKeys: ['route-speciality'],
    },
    SpeciallityDoctor: {
      key: 'route-speciality-doctors-details',
      text: 'Thông tin bác sĩ',
      url: '/speciality/doctors/details',
      parentKeys: ['route-speciality']
    },
    TotalCureProcess: {
        key: 'route-cure',
        text: 'Khám bệnh',
        url: '/cure/management',
    },
    CureProcess: {
        key: 'route-cure-management',
        text: 'Khám thường',
        url: '/cure/management',
        parentKeys:["route-cure"]
    },
    Schedule: {
        key: 'route-cure-appointment',
        text: 'Lịch hẹn khám',
        url: '/cure/appointment',
        parentKeys:["route-cure"]
    },
    CureHistory: {
        key: 'route-schedulehistory',
        text: 'Lịch sử khám bệnh',
        url: '/schedulehistory',
    },
    Appointment:{
        key: 'route-make-appointment',
        text: 'Đặt lịch khám',
        url: '/make-appointment',
    },
    Diseases: {
        key: 'route-diseases',
        text: 'Các loại bệnh',
        url: '/diseases',
    },
    Pills: {
        key: 'route-medication',
        text: 'Danh sách thuốc',
        url: '/medication',
    },
    News: {
        key: 'route-news',
        text: 'Thông tin, tư vấn',
        url: '/news/newsfeed',
    },
    NewsPost: {
        key: 'route-news-newsfeed',
        text: 'Tin tức',
        url: '/news/newsfeed',
        parentKeys:["route-news"]
    },
    NewsCreate:{
        key: 'route-news-newscreate',
        text: 'Tạo bài đăng',
        url: '/news/newscreate',
        parentKeys:["route-news"]
    },
    NewsReview:{
        key: 'route-news-newsreview',
        text: 'Duyệt bài đăng',
        url: '/news/newsreview',
        parentKeys:["route-news"]
    }
}

export const getRouteItemByKey = (routeKey: string) => {
    let currentRouteItem = routeMapping.Home;
    for (const key in routeMapping) {
        const item = routeMapping[key];
        if(item.key === routeKey){
            currentRouteItem = item;
        }
    }
    return currentRouteItem;
}

export const getRouteItemByUrl = (url: string) => {
    let currentRouteItem = routeMapping.Home;
    for (const key in routeMapping){
        const item = routeMapping[key];
        if (url.includes(item.url)){
            currentRouteItem = item
        }
    }
    return currentRouteItem;
}