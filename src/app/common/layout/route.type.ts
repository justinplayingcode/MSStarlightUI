
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
        text: 'Tổng quát',
        url: '/',
        iconName: 'fas-house'
    },

    Account: {
        key: 'route-account',
        text: 'Tài khoản',
        url: '',
    },
    AccountPatientManagement: {
        key: 'route-account-patient-management',
        text: 'Bệnh nhân',
        url: '/account/patient-management',
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

    TotalCureProcess: {
        key: 'route-total-cure-process',
        text: 'Khám, chữa bệnh',
        url: '',
    },
    CureProcess: {
        key: 'route-cure-process',
        text: 'Khám bệnh',
        url: '/cure/cure-process',
        parentKeys:["route-total-cure-process"]
    },
    OnBoarding:{
        key: 'route-onboarding',
        text: 'Đang nằm viện',
        url: '/cure/onBoarding',
        parentKeys:["route-total-cure-process"]
    },


    CureHistory: {
        key: 'route-cure-history',
        text: 'Lịch sử khám bệnh',
        url: '/cure-history',
        // parentKeys:["route-home"]
    },

    Appointment:{
        key: 'route-make-appointment',
        text: 'Đặt lịch khám',
        url: '/make-appointment',
    },

    Diseases: {
        key: 'route-diseases',
        text: 'Bệnh',
        url: '/diseases',
        // parentKeys:["route-home"]
    },
    Pills: {
        key: 'route-medication',
        text: 'Thuốc',
        url: '/medication',
        // parentKeys:["route-home"]
    },

    News: {
        key: 'route-news',
        text: 'Thông tin, tư vấn',
        // url: '/news',
    },
    NewsPost: {
        key: 'route-news-post',
        text: 'Các bài đăng',
        url: '/news/news-post',
        parentKeys:["route-news"]
    },
    NewsCreate:{
        key: 'route-news-create',
        text: 'Tạo bài đăng',
        url: '/news/news-create',
        parentKeys:["route-news"]
    },
    NewsReview:{
        key: 'route-news-review',
        text: 'Duyệt bài đăng',
        url: '/news/news-review',
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
        if (item.url === url){
            currentRouteItem = item
        }
    }
    return currentRouteItem;
}