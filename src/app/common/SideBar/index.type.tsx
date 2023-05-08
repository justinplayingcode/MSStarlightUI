import { accountRole } from "model";
import { AiOutlineHome, AiOutlineClockCircle } from 'react-icons/ai'
import { FaBacterium, FaPills, FaRegNewspaper} from 'react-icons/fa'
import { MdOutlineArrowRightAlt, MdManageAccounts, MdAccountTree } from 'react-icons/md'
import { TbStethoscope} from 'react-icons/tb'
import { RiArrowDownSFill, RiArrowUpSFill} from 'react-icons/ri'

export interface ISubNavProps{
    title: string,
    path: string,
    icon: JSX.Element
}
export interface ISideBarProps{
    title: string;
    path: string;
    icon: string | JSX.Element;
    iconClosed?: JSX.Element;
    iconOpened?: JSX.Element;
    subNav?: ISubNavProps[]
    key?: string
}

export const getNavList = (role: accountRole, isHomePage: boolean) => {
    const list: ISideBarProps[] = [];
    if(!isHomePage === true){
        list.push({
            title: 'Trang chủ',
            path: '/',
            icon: <AiOutlineHome/>,
        });
    }

    if(role === accountRole.Admin){
        list.push({
            title: 'Tài khoản',
            path: '/account',  
            icon: <MdManageAccounts/>,
            iconClosed: <RiArrowDownSFill/>,
            iconOpened: <RiArrowUpSFill/>,
            subNav:[
                {
                    title: 'Bác sĩ',
                    path: '/account/doctor-management',
                    icon: <MdOutlineArrowRightAlt/>
                },
                {
                    title: 'Bệnh nhân',
                    path: '/account/patient-management',
                    icon: <MdOutlineArrowRightAlt/>
                }
            ]
        });
        list.push(
            {
                title: 'Khoa, viện',
                path: '/speciality',
                icon: <MdAccountTree />,
            }
        );
    
    };

    if(role === accountRole.Doctor){
        list.push({
            title: 'Khám chữa bệnh',
            path: '/curing-process',
            icon: <TbStethoscope/>,
        })
    }

    if(role === accountRole.Doctor || role === accountRole.Patient){
        list.push({
            title: 'Lịch sử khám bệnh',
            path: '/cure-history',
            icon: <AiOutlineClockCircle/>,
        },)
    }

    list.push(
        {
            title: 'Bệnh',
            path: '/diseases',
            icon: <FaBacterium/>,
        },
        {
            title: 'Thuốc',
            path: '/pills',
            icon: <FaPills/>,
        },
        {
            title: 'Thông tin, tư vấn',
            path: '/news',
            icon: <FaRegNewspaper/>,
        }
    );
    return list;
}