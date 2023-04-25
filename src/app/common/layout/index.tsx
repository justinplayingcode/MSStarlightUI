import React from "react";
import "./index.scss"
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
import UniformHeader from "../header";
import { pageConstant } from "model";
import Home from "src/app/page/Home";
import { Login } from "src/app/page/Login";
import { LoadingDot } from "../loading";
import { ErrorPage } from "../ErrorPage";
import { Stack } from "@fluentui/react";
import AccountManagement from "src/app/page/Account";
import Speciality from "src/app/page/Speciality";
import CureHistory from "src/app/page/CureHistory";
import Diseases from "src/app/page/Diseases";
import Profile from "src/app/page/Profile";
import Pills from "src/app/page/Pills";
import News from "src/app/page/News";
import SideBar from "../SideBar";
import CureProcess from "src/app/page/CureProcess";
interface LayoutOwnProps {
    page: string;
}

interface LayoutPropsFromState {
    isLoading: boolean;
}

interface LayoutPropsFromDispatch {

}

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
})

const mapDispatchToProps = {};

type LayoutProps = LayoutOwnProps & LayoutPropsFromState & LayoutPropsFromDispatch;

interface LayoutState {
    hasLayout: boolean;
}

class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            hasLayout: false
        }
    }

    withoutDefaulLayout() {
        const { page } = this.props;
        switch (page) {
            case pageConstant.LAYOUT_LOGIN:
                return <Login />
            case pageConstant.LAYOUT_ERROR_PAGE:
                return <ErrorPage />
            default:
                this.setState({ hasLayout: true });
                return;
        }
    }

    hasDefaulLayout() {
        const { page } = this.props;
        let content: JSX.Element;
        switch (page) {
            case pageConstant.LAYOUT_HOME:
                content = <Home />
                break;
            case pageConstant.LAYOUT_PROFILE:
                content = <Profile />
                break;
            case pageConstant.LAYOUT_ACCOUNT:
                content = <AccountManagement />
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
                <Stack className="left-wrapper">
                    <SideBar/>
                </Stack>
                <Stack className="right-wrapper">
                    <UniformHeader/>
                    <Stack className="main-content">
                        {content}
                    </Stack>
                </Stack>
            </div>
        )
    }

    render() {
        const { hasLayout } = this.state;
        return (
            <>
                {this.props.isLoading ? <LoadingDot /> : <React.Fragment />}
                {hasLayout ? this.hasDefaulLayout() : this.withoutDefaulLayout()}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)