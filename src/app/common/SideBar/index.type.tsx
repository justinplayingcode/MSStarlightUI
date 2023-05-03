import { accountRole } from "model";
import { AiOutlineHome, AiOutlineClockCircle } from 'react-icons/ai'
import { FaBacterium, FaPills, FaRegNewspaper} from 'react-icons/fa'
import { MdManageAccounts, MdAccountTree } from 'react-icons/md'
import { TbStethoscope} from 'react-icons/tb'

export interface ISideBarProps{
    name: string;
    icon: string | JSX.Element;
    description?: string;
    url: string;
    imageUrl?: string;
    key?: string
}

export const getNavList = (role: accountRole, isHomePage: boolean) => {
    const list: ISideBarProps[] = [];
    if(!isHomePage === true){
        list.push({
            name: 'Trang chủ',
            icon: <AiOutlineHome/>,
            description: '',
            url: '/',
            imageUrl: ''
        });
    }

    if(role !== accountRole.Patient && role !== accountRole.Doctor){
        list.push({
            name: 'Tài khoản',
            icon: <MdManageAccounts/>,
            description:'Quản lý tài khoản của bác sĩ và bệnh nhân',
            url: '/account',   
            imageUrl: '#'
        });
        list.push(
            {
                name: 'Khoa, viện',
                icon: <MdAccountTree />,
                description: '',
                url: '/speciality',
                imageUrl: ''
            }
        );
    
    };

    if(role === accountRole.Doctor){
        list.push({
            name: 'Khám chữa bệnh',
            icon: <TbStethoscope/>,
            description: '',
            url: '/curing-process',
            imageUrl: ''
        })
    }

    list.push(
        {
            name: 'Lịch sử khám bệnh',
            icon: <AiOutlineClockCircle/>,
            description: '',
            url: '/cure-history',
            imageUrl: ''
        },
        {
            name: 'Bệnh',
            icon: <FaBacterium/>,
            description:'',
            url: '/diseases',
            imageUrl:''
        },
        {
            name: 'Thuốc',
            icon: <FaPills/>,
            description:'',
            url: '/pills',
            imageUrl:''
        },
        {
            name: 'Thông tin, tư vấn',
            icon: <FaRegNewspaper/>,
            description: '',
            url: '/news',
            imageUrl: ''
        }
    );
    return list;
}