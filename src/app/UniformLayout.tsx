import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./common/layout";
import { pageConstant } from "model";
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
import { Login } from "./page/Login";
import { ErrorPage } from "./common";

interface UniformLayoutPropsFromState {
}

interface UniformLayoutPropsFromDispatch {
    
}

interface UniformLayoutState {
    
}

type UniformLayoutProps = UniformLayoutPropsFromState & UniformLayoutPropsFromDispatch;

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loading.isLoading,
    user: state.user
})

const mapDispatchToProps = { };

class UniformLayout extends React.Component<UniformLayoutProps, UniformLayoutState> {
    constructor(props: UniformLayoutProps) {
        super(props);
    }


    render() {
        return (
            <div id="uniform-layout-wrapper">
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/" element={<Layout page={pageConstant.LAYOUT_HOME}/>} />
                        <Route path="/profile" element={<Layout page={pageConstant.LAYOUT_PROFILE}/>} />
                        <Route path="/account" element={<Layout page={pageConstant.LAYOUT_ACCOUNT}/>} />
                        <Route path='/account/create-doctor' element={<Layout page={pageConstant.LAYOUT_ACCOUNT_CREATE_DOCTOR}/>} />
                        <Route path="/speciality" element={<Layout page={pageConstant.LAYOUT_SPECIALITY}/>} />
                        <Route path="/curing-process" element={<Layout page={pageConstant.LAYOUT_CURE_PROCESS}/>} />
                        <Route path="/cure-history" element={<Layout page={pageConstant.LAYOUT_CURE_HISTORY}/>} />
                        <Route path="/diseases" element={<Layout page={pageConstant.LAYOUT_DISEASES}/>} />
                        <Route path="/pills" element={<Layout page={pageConstant.LAYOUT_PILLS}/>} />
                        <Route path="/news" element={<Layout page={pageConstant.LAYOUT_NEWS}/>} />
                        {/* <Route path={`/login${id}`} element={<Login />} /> */}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Router>                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UniformLayout)
