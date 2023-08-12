import { useSelector } from "react-redux";
import './index.scss'
import { accountRole } from "model";
import { RootState } from "src/redux/store";
import DoctorHome from "./components/Doctor";
import PatientHome from "./components/Patient";
import AdminHome from "./components/Admin";

const Home = () => {
  const { role } = useSelector((state:RootState) => state.user);

  const onRenderContent = (): JSX.Element => {
    switch(role) {
      case accountRole.Admin:
        return <AdminHome/>;
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