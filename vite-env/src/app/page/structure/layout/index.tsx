import React from "react";
import "./index.scss"
import { connect } from "react-redux";
import UniformHeader from "../header";
import { Stack } from "@fluentui/react";
import { Navigate } from "react-router-dom";
import DoctorAppointment from "../../DoctorAppointments";
import PasswordChange from "../../PasswordChange";
import PatientDetails from "../../DetailsUser/PatientDetails";
import DoctorDetails from "../../DetailsUser/DoctorDetails";
import DoctorInDepartment from "../../Speciality/DoctorInDepartment";
import DetailsCureHistory from "../../CureHistory/DetailsCureHistory";
import PatientManagement from "../../PatientManagement";
import PatientDetailsWithHitories from "../../PatientManagement/components/PatientDetailsWithHitstories";
import { ApiStatus, pageConstant } from "../../../../model";
import { RootState } from "../../../../redux/store";
import { closeLoading, openLoading, setInfoUser, setRole, setUsername } from "../../../../redux/reducers";
import Api from "../../../../api";
import Home from "../../Home";
import Profile from "../../Profile";
import AccountPage from "../../Account";
import Speciality from "../../Speciality";
import CureProcess from "../../CureProcess";
import CureHistory from "../../CureHistory";
import Appointment from "../../Appointment";
import Medication from "../../Medication";
import Diseases from "../../Diseases";
import News from "../../News";
import NewsPost from "../../News";
import NewsReview from "../../News/SubMenu/NewsReview";
import NewsCreate from "../../News/SubMenu/NewsCreate";
import SideBar from "../SideBar";
import { MainPanel } from "../../../common/Uniformpanel";
import { LoadingDot, LoadingInComing } from "../../../common/loading";
import { Toast } from "../../../common";
interface LayoutOwnProps {
    page: string;
    permission: number[];
}

interface LayoutPropsFromState {
    isLoading: boolean;
    username: any;
    showToast: boolean;
    role: any;
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
            default:
                content = <></>
                break;
        }

        if(!permission.includes(role)) {
          return <Navigate to="/error/nopermission" replace/>
        }
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