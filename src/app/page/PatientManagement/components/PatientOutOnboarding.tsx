import { UniformTable } from "src/app/common";
import { TableType, exportCsvType, toastType } from "src/model/enum";
import Api from "api";
import { patientonboardingtColumns } from "../../components/table/patientonboarding";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { ICommandBarItemProps } from "@fluentui/react";
import { showToastMessage } from "src/redux/reducers";

const PatientOutOnboarding = () => {
  const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCommandBar = () => {
    const commandBar: ICommandBarItemProps[] = [];
    if(tableSelectedCount === 1) {
      commandBar.push(
        {
          key: "details-patient",
          text: "Thông tin chi tiết",
          iconProps: { iconName: 'TextDocumentShared' },
          onClick: () => navigate(`/patient-management-doctor/details-history/${tableSelectedItem[0].patientId}`)
        }
      )
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
    Api.statisticApi.exportExcel(exportCsvType.patientOut).api.then(response  => {
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

  return(
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
          integrateItems={Api.cureProcessApi.getPatientsOnBoarding}
          columns={patientonboardingtColumns}
          commandBarItems={getCommandBar()}  
          tableType={TableType.schedulePatientOut}       
      />
    </div>
  )
}

export default PatientOutOnboarding;