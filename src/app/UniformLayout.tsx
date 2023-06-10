import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./page/structure/layout";
import { accountRole, pageConstant } from "model";
import { RootState } from "src/redux/store";
import { connect } from "react-redux";
import { Login } from "./page/Login";
import NoPermission from "./page/structure/NoPermission";
import { ErrorPage } from "./page/structure/ErrorPage";

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

                        <Route path="/cure/cure-process" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_CURE_PROCESS}/>} />
                        <Route path="/cure/onBoarding" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_ON_BOARDING}/>} />
                        <Route path="/curing-proces/cure-progress" element={<Layout permission={this.Auth.doctor} page={pageConstant.LAYOUT_CURE_PROGRESS}/>}/>

                        <Route path="/cure-history" element={<Layout permission={this.Auth.noAdmin} page={pageConstant.LAYOUT_CURE_HISTORY}/>} />
                        <Route path="/make-appointment" element={<Layout permission={this.Auth.patient} page={pageConstant.LAYOUT_APPOINTMENT} />} />
                        <Route path="/diseases" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_DISEASES}/>} />
                        <Route path="/medication" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_MEDICATION}/>} />

                        {/* <Route path="/news" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS}/>} /> */}
                        <Route path="/news" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS_POST}/>} />
                        <Route path="/news/news-create" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS_CREATE}/>} />
                        <Route path="/news/news-review" element={<Layout permission={this.Auth.all} page={pageConstant.LAYOUT_NEWS_REVIEW}/>} />
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
