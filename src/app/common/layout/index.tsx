import React from "react";
import "./index.scss"
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
import UniformHeader from "../header";
import {  ApiStatus, pageConstant } from "model";
import Home from "src/app/page/Home";
import { LoadingCirle, LoadingDot } from "../loading";
import { Stack } from "@fluentui/react";
import Speciality from "src/app/page/Speciality";
import CureHistory from "src/app/page/CureHistory";
import Diseases from "src/app/page/Diseases";
import Profile from "src/app/page/Profile";
import Pills from "src/app/page/Pills";
import News from "src/app/page/News";
import SideBar from "../SideBar";
import CureProcess from "src/app/page/CureProcess";
import { IToastProps, Toast } from "../Toast";
import { Navigate } from "react-router-dom";
import authApi from "src/api/auth";
import { setInfoUser, setRole, setUsername } from "src/redux/reducers";
import { Location } from "../layout/location";
import AccountPage from "src/app/page/Account";
import { MainPanel } from "../uniformpanel";
interface LayoutOwnProps {
    page: string;
}

interface LayoutPropsFromState {
    isLoading: boolean;
    username: string
}

interface LayoutPropsFromDispatch {
    setRole: any;
    setUsername: any;
    setInfoUser: any;
}

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
    username: state.user.username
})

const mapDispatchToProps = {
    setRole,
    setUsername,
    setInfoUser
};

type LayoutProps = LayoutOwnProps & LayoutPropsFromState & LayoutPropsFromDispatch;


interface LayoutState {
    toastList: IToastProps[];
    loading: boolean
}

class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            toastList: [],
            loading: true
        }
    }

    async componentDidMount() {
        const temp = localStorage.getItem('accessToken');
        if(temp) {
            const res = await authApi.checkCurrentUser();
                if(res.status === ApiStatus.succes) {
                    console.log(res.data.username)
                    this.props.setUsername(res.data.username);
                    this.props.setRole(res.data.role);
                } 
        }
        this.setState({loading: false})
    }

    addToast = (toast: IToastProps) => {
        this.setState(prevState => ({
            ...prevState,
            toastList: [toast]
        }))
    }
    
    
    handleToast = () => {
        const toastProperties = {
            id:1,
            title: 'Success',
            description: 'This is a success toast component',
            backgroundColor: '#5cb85c'
        }
        this.addToast(toastProperties);
    }

    renderContent() {
        const { page } = this.props;
        let content: JSX.Element;
        switch (page) {
            case pageConstant.LAYOUT_HOME:
                content = <Home />
                break;
            case pageConstant.LAYOUT_PROFILE:
                content = <Profile />
                break;
            case pageConstant.LAYOUT_ACCOUNT_PATIENT_MANAGEMENT:
                content = <AccountPage page={page}/>
                break;
            case pageConstant.LAYOUT_ACCOUNT_DOCTOR_MANAGEMENT:
                content = <AccountPage page={page}/>
                break;

            case pageConstant.LAYOUT_SPECIALITY:
                content = <Speciality />
                break;
            case pageConstant.LAYOUT_CURE_PROCESS:
                content = <CureProcess/>
                break;
            case pageConstant.LAYOUT_CURE_HISTORY:
                content = <CureHistory />
                break;
            case pageConstant.LAYOUT_DISEASES:
                content = <Diseases />
                break;
            case pageConstant.LAYOUT_PILLS:
                content = <Pills />
                break;
            case pageConstant.LAYOUT_NEWS:
                content = <News />
                break;
            default:
                content = <></>
                break;
        }

        return (
            <div id="layout-wrapper">
                <SideBar/>
                <Stack className="main-wrapper">
                    <UniformHeader/>
                    <Stack className="main-content">
                        <Stack className="header-breadcrumb">
                            <Location/>
                        </Stack>
                        {content}
                    </Stack>
                </Stack>
                <MainPanel/>
            </div>
        )
    }

    render() {
        const { toastList, loading } = this.state;
        const { username } = this.props;
        if(loading) {
            return <LoadingCirle/>
        } else {
            return (
                <>
                    {this.props.isLoading ? <LoadingDot /> : <React.Fragment />}
                    {username ? this.renderContent() : <Navigate to="/login" replace/>}
                    <Toast toastList={toastList} />
                </>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)