import { useSelector } from "react-redux";
import './index.scss'
import { accountRole } from "model";
import { RootState } from "src/redux/store";
import DoctorManagementChart from "./components/adminChart/doctormanagement";
import OnBoardingChart from "./components/adminChart/onboardingpermonth";
import PatientManagementChart from "./components/adminChart/patientmanagement";
import PatientExaminedChart from "./components/adminChart/patientexaminedperday";
import DoctorHome from "./components/Doctor";
import PatientHome from "./components/Patient";

interface IHealthStatus {
  key: string;
  value: any;
}


const Home = () => {
  const { role } = useSelector((state:RootState) => state.user);
  
  const onRenderAdmin = (): JSX.Element => {
    return (
      <>
      <div className="chart-container-wrapper chart-container">
        <PatientExaminedChart/>
      </div>
      <div className="chart-container-wrapper chart-container">
        <OnBoardingChart/>
      </div>
      <div className="chart-container-wrapper chart-container">
        <DoctorManagementChart/>
      </div>
      <div className="chart-container-wrapper chart-container">
        <PatientManagementChart/>
      </div>
      </>
    )
  }

  const onRenderContent = (): JSX.Element => {
    switch(role) {
      case accountRole.Admin:
        return onRenderAdmin();
      case accountRole.Doctor:
        return <DoctorHome/>;
      case accountRole.Patient:
        return <PatientHome/>;
    }
  }

  return (
    <div className="home-wrapper">
      <div className="content">{onRenderContent()}</div>
    </div>
  )
}

export default Home