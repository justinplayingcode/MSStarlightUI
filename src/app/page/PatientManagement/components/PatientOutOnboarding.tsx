import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import Api from "api";
import { patientonboardingtColumns } from "../../components/table/patientonboarding";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { ICommandBarItemProps } from "@fluentui/react";

const PatientOutOnboarding = () => {
  const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);
  const navigate = useNavigate();

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
    return commandBar;
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