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
import Navigation from "src/app/common/Navigation";
import { Stack } from "@fluentui/react";

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

            default:
                content = <></>
                break;
        }
        return (
            <div id="layout-wrapper">
                <Stack className="left-wrapper">
                    <Navigation />
                </Stack>
                <Stack className="right-wrapper">
                    <UniformHeader />
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