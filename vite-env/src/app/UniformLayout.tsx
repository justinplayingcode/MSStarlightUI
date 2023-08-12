import React from "react";
import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";
import Layout from "./page/structure/layout";
import { connect } from "react-redux";
import { Login } from "./page/Login";
import NoPermission from "./page/structure/NoPermission";
import { ErrorPage } from "./page/structure/ErrorPage";
import { RootState } from "../redux/store";
import { accountRole, pageConstant } from "../model";

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
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_HOME}/>} />
                        <Route path="/home/profile" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_PROFILE}/>} />
                        <Route path="/home/change-password" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_PASSWORD_CHANGE} />} />
                        <Route path="/patient-management" element={<Layout permission={this.Auth.admin} page={pageConstant.LAYOUT_ACCOUNT_PATIENT_MANAGEMENT}/>}/>
                        <Route path="/patient-management/patient-details/:id" element={<Layout permission={this.Auth.admin} page={pageConstant.LAYOUT_ACCOUNT_PATIENT_DETAILS}/>}/>
                        <Route path="/doctor-management" element={<Layout permission={this.Auth.admin} page={pageConstant.LAYOUT_ACCOUNT_DOCTOR_MANAGEMENT}/>}/>
                        <Route path="/doctor-management/doctor-details/:id" element={<Layout permission={this.Auth.admin} page={pageConstant.LAYOUT_ACCOUNT_DOCTOR_DETAILS}/>}/>
                        <Route path="/speciality" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_SPECIALITY}/>} />
                        <Route path="/speciality/doctors/:id" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_SPECIALITY_DOCTOR}/>} />
                        <Route path="/speciality/doctors/details/:id" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_ACCOUNT_DOCTOR_DETAILS}/>} />
                        <Route path="/cure/management" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_CURE_PROCESS}/>} />
                        <Route path="/patient-management-doctor" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_ON_BOARDING}/>} />
                        <Route path="/patient-management-doctor/details/:id" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_ON_BOARDING_DETAILS}/>} />
                        <Route path="/patient-management-doctor/details/historymedical/:id" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_ON_BOARDING_HISTORY}/>} />
                        <Route path="/schedulehistory" element={<Layout permission={this.Auth.noAdmin} page={pageConstant.LAYOUT_CURE_HISTORY}/>} />
                        <Route path="/schedulehistory/details/:id" element={<Layout permission={this.Auth.noAdmin} page={pageConstant.LAYOUT_CURE_HISTORY_DETAILS}/>} />
                        <Route path="/make-appointment" element={<Layout permission={this.Auth.patient} page={pageConstant.LAYOUT_APPOINTMENT} />} />
                        <Route path="/cure/appointment" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_DOCTORAPPOINTMENT} />} />
                        <Route path="/diseases" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_DISEASES}/>} />
                        <Route path="/medication" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_MEDICATION}/>} />
                        <Route path="/news/newsfeed" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS_POST}/>} />
                        <Route path="news/newscreate" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS_CREATE}/>} />
                        <Route path="news/newsreview" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS_REVIEW}/>} />
                        <Route path="/error/nopermission" element={<NoPermission />} />
                        <Route path="/error/notfound" element={<ErrorPage />} />
                        <Route path="*" element={<Navigate to="/error/notfound" replace />} />
                    </Routes>
                </Router>                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UniformLayout)
