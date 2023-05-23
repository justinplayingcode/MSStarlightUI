import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./common/layout";
import { accountRole, pageConstant } from "model";
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
import { Login } from "./page/Login";
import { ErrorPage } from "./common";
import NoPermission from "./page/NoPermission";

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
    private Auth = {
      all: [accountRole.Admin, accountRole.Doctor, accountRole.Patient],
      admin: [accountRole.Admin],
      doctor: [accountRole.Doctor],
      patient: [accountRole.Patient],
      noAdmin: [accountRole.Doctor, accountRole.Patient],
    }

    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_HOME}/>} />
                        <Route path="/profile" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_PROFILE}/>} />

                        <Route path="/account/patient-management" element={<Layout permission={this.Auth.admin} page={pageConstant.LAYOUT_ACCOUNT_PATIENT_MANAGEMENT}/>}/>
                        <Route path="/account/doctor-management" element={<Layout permission={this.Auth.admin} page={pageConstant.LAYOUT_ACCOUNT_DOCTOR_MANAGEMENT}/>}/>
                        
                        <Route path="/speciality" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_SPECIALITY}/>} />

                        <Route path="/curing-process" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_CURE_PROCESS}/>} />
                        <Route path="/curing-proces/cure-progress" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_CURE_PROGRESS}/>}/>

                        <Route path="/cure-history" element={<Layout permission={this.Auth.noAdmin} page={pageConstant.LAYOUT_CURE_HISTORY}/>} />
                        <Route path="/diseases" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_DISEASES}/>} />
                        <Route path="/medication" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_MEDICATION}/>} />
                        <Route path="/news" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS}/>} />
                        {/* <Route path={`/login${id}`} element={<Login />} /> */}
                        <Route path="/error/nopermission" element={<NoPermission />} />
                        <Route path="/error/not" element={<ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Router>                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UniformLayout)
