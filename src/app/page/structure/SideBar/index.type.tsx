import { accountRole } from "model";
import { AiOutlineClockCircle, AiOutlineFund, AiOutlineSchedule } from 'react-icons/ai'
import { FaBacterium, FaPills, FaRegNewspaper, FaUserMd, FaUserFriends, FaUsers } from 'react-icons/fa'
import { MdOutlineArrowRightAlt, MdManageAccounts, MdAccountTree, MdOutlineLocalHospital } from 'react-icons/md'
import { TbStethoscope} from 'react-icons/tb'
import { RiArrowDownSFill, RiArrowUpSFill} from 'react-icons/ri'
import { ReactNode } from "react";
import { DepartmentType } from "src/model/enum";

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

export const getNavList = (role: accountRole, departmentCode , isHomePage: boolean) => {
    const list: RouteType[] = [];
    list.push({
        path: '/home',
        state:'/home',
        sidebarProps: {
            displayText: 'Tổng quát',
            icon: <AiOutlineFund/>
        }
    });
    if(role === accountRole.Admin) {
      list.push(
        {
          path: '/doctor-management',
          state: '/doctor-management',
          sidebarProps:{
            displayText: 'Quản lý tải khoản bác sĩ',
            icon: <FaUserMd/>,
          },
        },
        {
          path: '/patient-management',
          state: '/patient-management',
          sidebarProps:{
            displayText: 'Quản lý tải khoản bệnh nhân',
            icon: <FaUserFriends/>,
          },
        },
        {
          path: '/speciality',
          state: '/speciality',
          sidebarProps:{
              displayText: 'Quản lý các khoa',
              icon: <MdAccountTree />,
          }
      }
      )
    }

    if(role === accountRole.Doctor && departmentCode !== DepartmentType.tiepDon && departmentCode !== DepartmentType.canLamSang) {
      list.push(
        {
          path: '/patient-management-doctor#tab0',
          state: '/patient-management-doctor',
          sidebarProps:{
            displayText: 'Quản lý bệnh nhân',
            icon: <FaUsers/>
          },
        },
      )
    }

    if(role === accountRole.Doctor) {
      if(departmentCode! === DepartmentType.tiepDon || departmentCode! === DepartmentType.canLamSang) {
        list.push(
          {
            path: '/cure/management#tab0',
            state: '/cure/management',
            sidebarProps:{
              displayText: departmentCode === DepartmentType.tiepDon ? 'Đăng ký khám bệnh' : 'Khám bệnh',
              icon: <TbStethoscope/>,
            },
          }
        )
      } else {
        list.push({
          state: '/cure',
          sidebarProps:{
            displayText: 'Khám bệnh',
            icon: <TbStethoscope/>,
          },
          child: [
            {
              path: '/cure/management#tab0',
              state: '/cure/management',
              sidebarProps:{
                displayText: 'Khám thường',
                icon: <MdOutlineArrowRightAlt/>,
              },
            },
            {
              path: '/cure/appointment#tab0',
              state: '/cure/appointment',
              sidebarProps:{
                displayText: 'Lịch khám bệnh',
                icon: <MdOutlineArrowRightAlt/>,
              },
            }
          ]
        })
      }
    }

    if((role === accountRole.Doctor && departmentCode !== DepartmentType.tiepDon)|| role === accountRole.Patient) {
        list.push({
            path: '/schedulehistory',
            state: '/schedulehistory',
            sidebarProps:{
                displayText: 'Lịch sử khám bệnh',
                icon: <AiOutlineClockCircle/>,
            }
        },)
    }

    if(role === accountRole.Patient){
        list.push({
            path:'/make-appointment#tab0',
            state:'/make-appointment',
            sidebarProps:{
                displayText: 'Lịch khám bệnh',
                icon: <AiOutlineSchedule/>
            }
        })
    }

    list.push(
        {
            path: '/diseases',
            state: '/diseases',
            sidebarProps:{
                displayText: 'Các loại bệnh',
                icon: <FaBacterium/>,
            }
        },
        {
            path: '/medication',
            state: '/medication',
            sidebarProps:{
                displayText: 'Danh sách thuốc',
                icon: <FaPills/>,
            }
        },
    );
    let newsItems;
    if(role === accountRole.Patient) {
      newsItems = {
        path: '/news/newsfeed',
        state: '/news/newsfeed',
        sidebarProps: {
          displayText: 'Thông tin, tin tức',
          icon: <FaRegNewspaper />,
        },
      }
    } else {
      newsItems = {
        state: '/news',
        sidebarProps: {
          displayText: 'Thông tin, tin tức',
          icon: <FaRegNewspaper />,
        },
        child:[
          {
            path: '/news/newsfeed',
            state: '/news/newsfeed',
            sidebarProps: {
                displayText: 'Tin tức',
                icon: <MdOutlineArrowRightAlt />
            }
          },
          {
            path: '/news/newscreate',
            state: '/news/newscreate',
            sidebarProps:{
                displayText: 'Tạo bài đăng',
                icon: <MdOutlineArrowRightAlt/>
            }
          }
        ]
      }
    }
    if(role === accountRole.Admin){
        newsItems.child.push(
            {
                path: '/news/newsreview',
                state: '/news/newsreview',
                sidebarProps:{
                    displayText: 'Duyệt bài đăng',
                    icon: <MdOutlineArrowRightAlt/>
                }
            }
        )
    }
    list.push(newsItems);

    return list;
}   