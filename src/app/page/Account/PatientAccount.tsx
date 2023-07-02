import { useDispatch } from "react-redux";
import { UniformTable } from "src/app/common";
import { panelTypeConstant } from "src/model/contant";
import { openPanel } from "src/redux/reducers";
import Api from 'src/api'
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { accountRole } from "model";
import { TableType } from "src/model/enum";
import { patientmanagementColumns } from "../components/table/patientmanagementcolumn";
import { useState } from "react";
import ResetPassword from "./dialog/resetPassword";
import { useNavigate } from "react-router-dom";

function PatientAccount() {
  const dispatch = useDispatch();

  const [hiddenReset, setHiddenReset] = useState<boolean>(true);
  const { role, info } = useSelector((state: RootState) => state.user);
  const { tableSelectedCount, tableSelectedItem } = useSelector((state: RootState) => state.currentSelected);
  const navigate = useNavigate();


  const getPatientmanagementCommandBar = () => {

    //remove add button
    const commandBar = [];
    if (role === accountRole.Doctor && info?.department === 'Khoa Tiếp Đón') {
      commandBar.push(
        {
          key: 'newItem',
          text: 'Thêm',
          iconProps: { iconName: 'Add' },
          onClick: () => { dispatch(openPanel(panelTypeConstant.PANEL_CREATE_PATIENT)) },
        },
      )
    };
    if (tableSelectedCount === 1) {
      commandBar.push({
        key: 'edit',
        text: 'Thông tin bệnh nhân',
        iconProps: { iconName: 'ContactInfo' },
        onClick: () => { navigate(`/patient-management/patient-details/${tableSelectedItem[0]?.userId}`) },
      });
      commandBar.push({
        key: "resetPassword",
        text: "Đặt lại mật khẩu",
        iconProps: { iconName: 'Rename' },
        onClick: () => setHiddenReset(false)
      })
    };
    return commandBar;

  }

  return (
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
        integrateItems={Api.accountApi.getAll}
        columns={patientmanagementColumns}
        commandBarItems={getPatientmanagementCommandBar()}
        tableType={TableType.patientAccount}
      />
      <ResetPassword
        isHidden={hiddenReset}
        onDismiss={() => {
          setHiddenReset(true);
        }}
      />
    </div>
  );
}

export default PatientAccount;