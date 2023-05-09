export interface IRouteItem {
    key: string;
    text: string;
    url?: string;
    iconName?:string;
    parentKeys?: string[]
}

export const routeMapping : { [key: string]: IRouteItem} = {
    Home: {
        key: "route-home",
        text: 'Trang chủ',
        url: '/',
        iconName: 'fas-house'
    },

    Account: {
        key: 'route-account',
        text: 'Tài khoản',
        url: '/account',
        // parentKeys:["route-home"]
    },
    AccountCreatePatient: {
        key: 'route-account-create-patient',
        text: 'Thêm bệnh nhân',
        url: '/account/create-patient',
        parentKeys:["route-account"]
    },
    AccountPatientManagement: {
        key: 'route-account-patient-management',
        text: 'Bệnh nhân',
        url: '/account/patient-management',
        parentKeys:["route-account"]
    },
    AccountCreateDoctor: {
        key: 'route-account-create-doctor',
        text: 'Thêm bác sĩ',
        url: '/account/create-doctor',
        parentKeys:["route-account"]
    },
    AccountDoctorManagement: {
        key: 'route-account-doctor-management',
        text: 'Bác sĩ',
        url: '/account/doctor-management',
        parentKeys:["route-account"]
    },

    Speciallity: {
        key: 'route-speciality',
        text: 'Khoa',
        url: '/speciality',
        // parentKeys:["route-home"]
    },
    CuringProcess: {
        key: 'route-curing-process',
        text: 'Khám, chữa bệnh',
        url: '/curing-process',
        // parentKeys:["route-home"]
    },
    CureHistory: {
        key: 'route-cure-history',
        text: 'Lịch sử khám bệnh',
        url: '/cure-history',
        // parentKeys:["route-home"]
    },
    Diseases: {
        key: 'route-diseases',
        text: 'Bệnh',
        url: '/diseases',
        // parentKeys:["route-home"]
    },
    Pills: {
        key: 'route-pills',
        text: 'Thuốc',
        url: '/pills',
        // parentKeys:["route-home"]
    },
    News: {
        key: 'route-news',
        text: 'Thông tin, tư vấn',
        url: '/news',
        // parentKeys:["route-home"]
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
        if (item.url === url){
            currentRouteItem = item
        }
    }
    return currentRouteItem;
}