import { Breadcrumb, IBreadcrumbItem, Stack } from '@fluentui/react';
import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './location.scss'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { DepartmentType, accountRole } from 'src/model/enum';

interface IRouteItem {
  key: string;
  text: string;
  url?: string;
  iconName?:string;
  parentKeys?: string[]
}

export const Location = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { info, role } = useSelector((state: RootState) => state.user)

    const routeMapping : {[key: string]: IRouteItem} = {
      Home: {
          key: "route-home",
          text: 'Tổng quát',
          url: '/home',
      },
      Profile: {
          key: "route-home-profile",
          text: 'Hồ sơ cá nhân',
          url: '/home/profile',
          parentKeys:["route-home"]
      },
      ChangePW: {
        key: "route-home-changepw",
        text: 'Đổi mật khẩu',
        url: '/home/change-password',
        parentKeys:["route-home"]
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
      PatientManagementDoctorDetails: {
        key: 'route-patient-management-doctor-details',
        text: 'Thông tin bệnh nhân',
        url: '/patient-management-doctor/details/',
        parentKeys:["route-patient-management-doctor"]
      },
      PatientManagementDoctorDetailsHitories: {
        key: 'route-patient-management-doctor-details-hítory',
        text: 'Lịch sử khám bệnh',
        url: '/patient-management-doctor/details/historymedical/',
        parentKeys:["route-patient-management-doctor", "route-patient-management-doctor-details"]
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
        parentKeys: ['route-speciality','route-speciality-doctors']
      },
      TotalCureProcess: {
          key: 'route-cure',
          text: info?.departmentCode !== DepartmentType.tiepDon ? 'Khám bệnh' : 'Đăng ký khám bệnh',
          url: '/cure/management',
      },
      CureProcess: {
          key: 'route-cure-management',
          text: info?.departmentCode !== DepartmentType.tiepDon ? 'Khám thường' : 'Đăng ký khám bệnh',
          url: '/cure/management',
          parentKeys: info?.departmentCode !== DepartmentType.tiepDon ? ["route-cure"] : undefined
      },
      Schedule: {
          key: 'route-cure-appointment',
          text: 'Lịch khám bệnh',
          url: '/cure/appointment',
          parentKeys:["route-cure"]
      },
      CureHistory: {
          key: 'route-schedulehistory',
          text: 'Lịch sử khám bệnh',
          url: '/schedulehistory',
      },
      CureHistoryDetails: {
          key: 'route-schedulehistory-details',
          text: 'Chi tiết',
          url: '/schedulehistory/details',
          parentKeys:["route-schedulehistory"]
      },
      Appointment:{
          key: 'route-make-appointment',
          text: 'Lịch khám bệnh',
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
          text: 'Thông tin, tin tức',
          url: '/news/newsfeed',
      },
      NewsPost: {
          key: 'route-news-newsfeed',
          text: role === accountRole.Patient ? 'Thông tin, tin tức' : 'Tin tức',
          url: '/news/newsfeed',
          parentKeys: role === accountRole.Patient ? undefined : ["route-news"]
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
    
    const getRouteItemByKey = (routeKey: string) => {
      let currentRouteItem = routeMapping.Home;
      for (const key in routeMapping) {
          const item = routeMapping[key];
          if(item.key === routeKey){
              currentRouteItem = item;
          }
      }
      return currentRouteItem;
    }
    
    const getRouteItemByUrl = (url: string) => {
      let currentRouteItem = routeMapping.Home;
      for (const key in routeMapping){
          const item = routeMapping[key];
          if (url.includes(item.url)){
              currentRouteItem = item
          }
      }
      return currentRouteItem;
    }

    const assembleParentItem = (key: string) => {
        const routeItem = getRouteItemByKey(key);
        const item: IBreadcrumbItem = {
            text:'',
            key:''
        };
        item.key = routeItem.key;
        item.text = routeItem.text
        if (routeItem.url){
            item.onClick = () => {
              if(routeItem.parentKeys) {
                navigate(-1);
              } else {
                navigate(routeItem.url)
              }
            }
        } else {
            item.style = { textDecoration: "unset"};
        }        
        return item;
    }

    const assembleBreadItem = React.useCallback(() => {
        const routeItem = getRouteItemByUrl(pathname);        
        const items: IBreadcrumbItem[] = [];

        if(routeItem?.parentKeys?.length)
          routeItem.parentKeys.forEach((key) => {
              items.push(assembleParentItem(key))
          });
          items.push({
            key: routeItem.key,
            text: routeItem.text
          });
        return items;
    },[pathname]);

    return(
        <Stack className='breadcrumbs'>
            <Breadcrumb
                items={assembleBreadItem()}
            />
        </Stack>
    )
}