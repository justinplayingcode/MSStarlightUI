import { useSelector } from "react-redux";
import './index.scss'
import DoctorHome from "./components/Doctor";
import PatientHome from "./components/Patient";
import AdminHome from "./components/Admin";
import { RootState } from "../../../redux/store";
import { accountRole } from "../../../model";

const Home = () => {
  const { role } = useSelector((state:RootState) => state.user);

  const onRenderContent = (): any => {
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