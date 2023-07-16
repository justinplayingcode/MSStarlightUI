import React from "react";
import "./index.scss"
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
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
import { Navigate } from "react-router-dom";
import Api from "src/api";
import { closeLoading, openLoading, setInfoUser, setRole, setUsername } from "src/redux/reducers";
import AccountPage from "src/app/page/Account";
import Medication from "src/app/page/Medication";
import Appointment from "src/app/page/Appointment";
import NewsPost from "src/app/page/News";
import NewsCreate from "src/app/page/News/SubMenu/NewsCreate";
import NewsReview from "src/app/page/News/SubMenu/NewsReview";
import TreatmentManagement from "src/app/page/CureProcess/TreatmentManagement";
import { MainPanel } from "src/app/common/Uniformpanel";
import { LoadingDot, LoadingInComing } from "src/app/common/loading";
import DoctorAppointment from "../../DoctorAppointments";
import PasswordChange from "../../PasswordChange";
import PatientDetails from "../../DetailsUser/PatientDetails";
import DoctorDetails from "../../DetailsUser/DoctorDetails";
import DoctorInDepartment from "../../Speciality/DoctorInDepartment";
import DetailsCureHistory from "../../CureHistory/DetailsCureHistory";
interface LayoutOwnProps {
    page: string;
    permission: number[];
}

interface LayoutPropsFromState {
    isLoading: boolean;
    username: string;
    showToast: boolean;
    role: accountRole;
}

interface LayoutPropsFromDispatch {
    setRole: any;
    setUsername: any;
    setInfoUser: any;
    closeLoading: any;
    openLoading: any;
}

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
    username: state.user.username,
    showToast: state.toast.isShow,
    role: state.user.role
})

const mapDispatchToProps = {
    setRole,
    setUsername,
    setInfoUser,
    closeLoading, openLoading
};

type LayoutProps = LayoutOwnProps & LayoutPropsFromState & LayoutPropsFromDispatch;


interface LayoutState {
    loading: boolean
}

class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        Promise.all([this.checkCurrentUser(), this.getInfoCurrentUser()]).then(result => {
          if(result[0] === ApiStatus.succes && result[1] === ApiStatus.succes) {
            this.setState({loading: false})
          } else {
            localStorage.clear();
            window.location.pathname = "/login";
          }
        })
        // .catch(() => {
        //   localStorage.clear();
        //   window.location.pathname = "/login";
        // })
    }

    checkCurrentUser = async () => {
        const temp = localStorage.getItem('accessToken');
        if(temp) {
            const res = await Api.authApi.checkCurrentUser();
                if(res.status === ApiStatus.succes) {
                    this.props.setUsername(res.data.username);
                    this.props.setRole(res.data.role);
                }
            return res.status;
        } else {
            return ApiStatus.fail
        }
    }

    getInfoCurrentUser = async () => {
        const res = await Api.authApi.getInfoCurrentUser();
        if(res.status === ApiStatus.succes) {
            this.props.setInfoUser(res.data);
        }
        return res.status
    }

    renderContent() {
        const { page, permission, role } = this.props;
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
                content = <TreatmentManagement/>;
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

    render() {
        const { loading } = this.state;
        const { username, showToast, isLoading } = this.props;
        if(loading) {
            return <LoadingInComing/>
        } else {
            return (
                <>
                    {isLoading ? <LoadingDot /> : <React.Fragment />}
                    {username ? this.renderContent() : <Navigate to="/login" replace/>}
                    {showToast && <Toast />}
                </>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)