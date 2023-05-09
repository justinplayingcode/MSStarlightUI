import { pageConstant } from "model";
import DoctorAcount from "./DoctorAcount";
import PatientAccount from "./PatientAccount";

interface IAccountProps {
  page: string;
}

const AccountPage = ({...props}: IAccountProps) => {

  const renderContent = () => {
    switch(props.page) {
      case pageConstant.LAYOUT_ACCOUNT_DOCTOR_MANAGEMENT:
        return <DoctorAcount/>
      case pageConstant.LAYOUT_ACCOUNT_PATIENT_MANAGEMENT:
        return <PatientAccount/>
    }
  }

  return (
    <>{renderContent()}</>
  )
}

export default AccountPage