import { accountRole } from "model";
import { INavListProps } from ".";

export const getNavList = (role: accountRole, isHomePage: boolean) => {
    const list: INavListProps[] = [];
    if(!isHomePage === true){
        list.push({
            name: 'Trang chủ',
            icon: 'Home',
            description: '',
            url: '/',
            imageUrl: ''
        });
    }

    if(role !== accountRole.Patient){
        list.push({
            name: 'Tài khoản',
            icon: 'AccountManagement',
            description:'Quản lý tài khoản của bác sĩ và bệnh nhân',
            url: '/account',   
            imageUrl: '#'
        });

        if(role !== accountRole.Doctor){
            list.push(
            {
                name: 'Khoa, viện',
                icon: 'ManagerSelfService',
                description: '',
                url: '/speciality',
                imageUrl: ''
            }
            )
        }
    };

    list.push(
        {
            name: 'Lịch sử khám bệnh',
            icon: 'Clock',
            description: '',
            url: '/cure-history',
            imageUrl: ''
        },
        {
            name: 'Bệnh',
            icon: 'Trackers',
            description:'',
            url: '/diseases',
            imageUrl:''
        },
        {
            name: 'Thuốc',
            icon: 'Pill',
            description:'',
            url: '/pills',
            imageUrl:''
        },
        {
            name: 'Thông tin, tư vấn',
            icon: 'News',
            description: '',
            url: '/news',
            imageUrl: ''
        }
    );
    return list;
}