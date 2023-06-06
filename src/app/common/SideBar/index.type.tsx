import { accountRole } from "model";
import { AiOutlineClockCircle, AiOutlineFund, AiOutlineSchedule } from 'react-icons/ai'
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
            displayText: 'Tổng quát',
            icon: <AiOutlineFund/>
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
            state: '/cure',
            sidebarProps:{
                displayText: 'Khám chữa bệnh',
                icon: <TbStethoscope/>,
            },
            child:[
                {
                    path: '/cure/cure-process',
                    state: '/cure/cure-process',
                    sidebarProps:{
                        displayText: 'Khám bệnh',
                        icon: <MdOutlineArrowRightAlt/>
                    },  
                },
                {
                    path: '/cure/onBoarding',
                    state: '/cure/onBoarding',
                    sidebarProps:{
                        displayText: 'Điều trị',
                        icon: <MdOutlineArrowRightAlt/>
                    }
                }
            ]
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

    if(role === accountRole.Patient){
        list.push({
            path:'/make-appointment',
            state:'/make-appointment',
            sidebarProps:{
                displayText: 'Đặt lịch khám',
                icon: <AiOutlineSchedule/>
            }
        })
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
    );

    const newsItems = {
        ...(role === accountRole.Patient) && {path: '/news'},
        state: '/news',
        sidebarProps: {
            displayText: 'Thông tin, tư vấn',
            icon: <FaRegNewspaper />,
        },
        child:[]
    };

    if (role !== accountRole.Patient) {
        newsItems.child.push(
            {
                path: '/news/news-post',
                state: '/news/news-post',
                sidebarProps: {
                    displayText: 'Các bài đăng',
                    icon: <MdOutlineArrowRightAlt />
                }
            },
            {
                path: '/news/news-create',
                state: '/news/news-create',
                sidebarProps:{
                    displayText: 'Tạo bài đăng',
                    icon: <MdOutlineArrowRightAlt/>
                }
            }
        );
        if(role === accountRole.Admin){
            newsItems.child.push(
                {
                    path: '/news/news-review',
                    state: '/news/news-review',
                    sidebarProps:{
                        displayText: 'Duyệt bài đăng',
                        icon: <MdOutlineArrowRightAlt/>
                    }
                }
            )
        }
    }

    list.push(newsItems);

    return list;
}   