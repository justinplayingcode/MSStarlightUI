import React, { useEffect, useState } from "react";
import "./index.scss"
import { RootState } from "src/redux/store";
import { connect, useDispatch, useSelector } from "react-redux";
import UniformHeader from "../header";
import {  ApiStatus, accountRole, pageConstant } from "model";
import Home from "src/app/page/Home";
import { Stack } from "@fluentui/react";
import Speciality from "src/app/page/Speciality";
import CureHistory from "src/app/page/CureHistory";
import Diseases from "src/app/page/Diseases";
import Profile from "src/app/page/Profile";
import News from "src/app/page/News";
import SideBar from "../SideBar";
import CureProcess from "src/app/page/CureProcess";
import { Toast } from "../../../common/Toast";
import { Navigate, useNavigate } from "react-router-dom";
import Api from "src/api";
import { closeLoading, openLoading, setInfoUser, setRole, setUsername, userLogout } from "src/redux/reducers";
import AccountPage from "src/app/page/Account";
import Medication from "src/app/page/Medication";
import Appointment from "src/app/page/Appointment";
import NewsPost from "src/app/page/News";
import NewsCreate from "src/app/page/News/SubMenu/NewsCreate";
import NewsReview from "src/app/page/News/SubMenu/NewsReview";
// import { MainPanel } from "src/app/common/Uniformpanel";
import { LoadingDot, LoadingInComing } from "src/app/common/loading";
import DoctorAppointment from "../../DoctorAppointments";
import PasswordChange from "../../PasswordChange";
import PatientDetails from "../../DetailsUser/PatientDetails";
import DoctorDetails from "../../DetailsUser/DoctorDetails";
import DoctorInDepartment from "../../Speciality/DoctorInDepartment";
import DetailsCureHistory from "../../CureHistory/DetailsCureHistory";
import PatientManagement from "../../PatientManagement";
import PatientDetailsWithHitories from "../../PatientManagement/components/PatientDetailsWithHitstories";
import { MainPanel } from "src/app/common/uniformpanel";
import DetailsBill from "../../CureHistory/DetailsBill";
interface LayoutOwnProps {
    page: string;
    permission: number[];
}

const Layout = ({...props}: LayoutOwnProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch();
  const { username, role } = useSelector((state: RootState) => state.user);
  const { isLoading } = useSelector((state: RootState) => state.loading);
  const { isShow } = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        Promise.all([checkCurrentUser(), getInfoCurrentUser()]).then(result => {
          if(result[0] !== ApiStatus.succes && result[1] !== ApiStatus.succes) {
            localStorage.clear();
            dispatch(userLogout());
          }
        }).catch().finally(() => setLoading(false))
    }, [])

    const checkCurrentUser = async () => {
        const temp = localStorage.getItem('accessToken');
        if(temp) {
            const res = await Api.authApi.checkCurrentUser();
            console.log(res)
                if(res.status === ApiStatus.succes) {
                    dispatch(setUsername(res.data.username));
                    dispatch(setRole(res.data.role));
                }
            return res.status;
        } else {
            return ApiStatus.fail
        }
    }

    const getInfoCurrentUser = async () => {
        const res = await Api.authApi.getInfoCurrentUser();
        console.log(res)
        if(res.status === ApiStatus.succes) {
          dispatch(setInfoUser(res.data));
        }
        return res.status
    }

    const renderContent = () => {
        const { page, permission } = props;
        let content: JSX.Element;

        switch (page) {
            case pageConstant.LAYOUT_HOME:
                content = <Home />
                break;
            case pageConstant.LAYOUT_PROFILE:
                content = <Profile />
                break;
            case pageConstant.LAYOUT_PASSWORD_CHANGE:
                content = <PasswordChange />
                break;
            case pageConstant.LAYOUT_ACCOUNT_PATIENT_MANAGEMENT:
                content = <AccountPage page={page}/>
                break;
            case pageConstant.LAYOUT_ACCOUNT_PATIENT_DETAILS:
                content = <PatientDetails/>
                break;
            case pageConstant.LAYOUT_ACCOUNT_DOCTOR_MANAGEMENT:
                content = <AccountPage page={page}/>
                break;
            case pageConstant.LAYOUT_ACCOUNT_DOCTOR_DETAILS:
                content = <DoctorDetails/>;
                break;
            case pageConstant.LAYOUT_SPECIALITY:
                content = <Speciality />
                break;
            case pageConstant.LAYOUT_CURE_PROCESS:
                content = <CureProcess/>
                break;
            case pageConstant.LAYOUT_ON_BOARDING:
                content = <PatientManagement/>;
                break;                
            case pageConstant.LAYOUT_CURE_HISTORY:
                content = <CureHistory />
                break;
            case pageConstant.LAYOUT_APPOINTMENT:
                content = <Appointment/>
                break;
            case pageConstant.LAYOUT_DISEASES:
                content = <Diseases />
                break;
            case pageConstant.LAYOUT_MEDICATION:
                content = <Medication />
                break;
            case pageConstant.LAYOUT_NEWS:
                content = <News />
                break;
            case pageConstant.LAYOUT_NEWS_POST:
                content = <NewsPost/>
                break;
            case pageConstant.LAYOUT_NEWS_CREATE:
                content = <NewsCreate/>
                break;
            case pageConstant.LAYOUT_NEWS_REVIEW:
                content = <NewsReview/>
                break;
            case pageConstant.LAYOUT_DOCTORAPPOINTMENT:
                content = <DoctorAppointment/>
                break;
            case pageConstant.LAYOUT_SPECIALITY_DOCTOR:
                content = <DoctorInDepartment/>
                break;
            case pageConstant.LAYOUT_CURE_HISTORY_DETAILS:
                content = <DetailsCureHistory/>
                break;
            case pageConstant.LAYOUT_ON_BOARDING_DETAILS:
                content = <PatientDetailsWithHitories/>
                break;
            case pageConstant.LAYOUT_ON_BOARDING_HISTORY:
                content = <DetailsCureHistory/>
                break;
            case pageConstant.LAYOUT_CURE_HISTORY_BILL:
                content = <DetailsBill/>
                break;
            default:
                content = <></>
                break;
        }

        if(!permission.includes(role)) {
          return <Navigate to="/error/nopermission" replace/>
        };
        return (
            <div id="layout-wrapper">
              <SideBar/>
              <Stack className="main-wrapper">
                <UniformHeader/>
                <Stack className="main-content">
                  {content} 
                </Stack>
              </Stack>
              <MainPanel/>
            </div>
        )
    }

    if(loading) {
        return <LoadingInComing/>
    } else {
        return (
            <div key={username}>
                {isLoading ? <LoadingDot /> : <React.Fragment />}
                {!!username ? renderContent() : <Navigate to="/login" replace />}
                {isShow && <Toast />}
            </div>
        )
    }
}

export default Layout;