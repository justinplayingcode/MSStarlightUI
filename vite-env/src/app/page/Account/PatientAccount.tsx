import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { patientmanagementColumns } from "../components/table/patientmanagementcolumn";
import { useState } from "react";
import ResetPassword from "./dialog/resetPassword";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { accountRole } from "../../../model";
import { panelTypeConstant } from "../../../model/contant";
import { openPanel, showToastMessage } from "../../../redux/reducers";
import Api from "../../../api";
import { TableType, exportCsvType, toastType } from "../../../model/enum";
import { UniformTable } from "../../common";

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
    }
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
    }
    commandBar.push({
      key: "export",
      text: "Xuất file excel",
      iconProps: { iconName: 'Installation' },
      onClick: handleExportCsv
    })
    return commandBar;
  }

  const handleExportCsv = () => {
    dispatch(showToastMessage({message: 'Đang tiến hành tải file, vui lòng chờ trong ít phút', type: toastType.info}));
    Api.statisticApi.exportExcel(exportCsvType.patientAccount).api.then(response  => {
      const blob = new Blob([(response as any).csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename: string = (response as any).fileName;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(() => {
      dispatch(showToastMessage({message: 'Xảy ra lỗi khi tải xuống, vui lòng thử lại', type: toastType.error}));
    });
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