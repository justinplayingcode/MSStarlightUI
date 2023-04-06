import React from "react";
import "./index.scss"
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
import UniformHeader from "../header";
import { pageConstant } from "model";
import Home from "src/app/page/Home";
import Login from "src/app/page/Login";
import { LoadingDot } from "../loading";

interface DefaultLayoutOwnProps {
	page: string;
}

interface DefaultLayoutPropsFromState {
    isLoading: boolean;
}

interface DefaultLayoutPropsFromDispatch {
    
}

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
})

const mapDispatchToProps = { };

type DefaultLayoutProps = DefaultLayoutOwnProps & DefaultLayoutPropsFromState & DefaultLayoutPropsFromDispatch;

class Layout extends React.Component<DefaultLayoutProps> {
    constructor(props: DefaultLayoutProps) {
		super(props);
	}

    renderContent() {
        const { page } = this.props;
        switch(page) {
            case pageConstant.LAYOUT_HOME:
                return <Home/>
            case pageConstant.LAYOUT_LOGIN:
                return <Login/>
        }
    }

    renderWrapper() {
        return (
                <div id="layout-wrapper">
                <UniformHeader/>
                {this.renderContent()}    
            </div>
        )
    }

    render() {
        return (
            <>
            {this.props.isLoading ? <LoadingDot/> : <React.Fragment/>}
            {this.renderWrapper()}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)