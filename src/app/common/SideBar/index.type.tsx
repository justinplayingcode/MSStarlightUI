import { accountRole } from "model";
import { AiOutlineHome, AiOutlineClockCircle } from 'react-icons/ai'
import { FaBacterium, FaPills, FaRegNewspaper} from 'react-icons/fa'
import { MdOutlineArrowRightAlt, MdManageAccounts, MdAccountTree } from 'react-icons/md'
import { TbStethoscope} from 'react-icons/tb'
import { RiArrowDownSFill, RiArrowUpSFill} from 'react-icons/ri'
import { ReactNode } from "react";

export type RouteType = {
    index?: boolean,
    path?: string,
    element?: ReactNode,
    state: string,
    sidebarProps?: {
      displayText: string,
      icon?: ReactNode;
    };
    child?: RouteType[],
  };

export const getNavList = (role: accountRole, isHomePage: boolean) => {
    const list: RouteType[] = [];
    list.push({
        path: '/',
        state:'',
        sidebarProps: {
            displayText: 'Trang chủ',
            icon: <AiOutlineHome/>
        }
    });

    if(role === accountRole.Admin){
        list.push({
            state: '/account',
            sidebarProps:{
                displayText: 'Tài khoản',
                icon: <MdManageAccounts/>,
            },
            child:[
                {
                    path: '/account/doctor-management',
                    state: '/account/doctor-management',
                    sidebarProps:{
                        displayText: 'Bác sĩ',
                        icon: <MdOutlineArrowRightAlt/>
                    },  
                },
                {
                    path: '/account/patient-management',
                    state: '/account/patient-management',
                    sidebarProps:{
                        displayText: 'Bệnh nhân',
                        icon: <MdOutlineArrowRightAlt/>
                    }
                }
            ]
        });
        list.push(
            {
                path: '/speciality',
                state: '/speciality',
                sidebarProps:{
                    displayText: 'Khoa',
                    icon: <MdAccountTree />,
                }
            }
        );
    
    };

    if(role === accountRole.Doctor){
        list.push({
            path: '/curing-process',
            state: '/curing-process',
            sidebarProps:{
                displayText: 'Khám chữa bệnh',
                icon: <TbStethoscope/>,
            }
        })
    }

    if(role === accountRole.Doctor || role === accountRole.Patient){
        list.push({
            path: '/cure-history',
            state: '/cure-history',
            sidebarProps:{
                displayText: 'Lịch sử khám bệnh',
                icon: <AiOutlineClockCircle/>,
            }
        },)
    }

    list.push(
        {
            path: '/diseases',
            state: '/diseases',
            sidebarProps:{
                displayText: 'Bệnh',
                icon: <FaBacterium/>,
            }
        },
        {
            path: '/medication',
            state: '/medication',
            sidebarProps:{
                displayText: 'Thuốc',
                icon: <FaPills/>,
            }
        },
        {
            path: '/news',
            state: '/news',
            sidebarProps:{
                displayText: 'Thông tin, tư vấn',
                icon: <FaRegNewspaper/>,
            }
        }
    );
    return list;
}   