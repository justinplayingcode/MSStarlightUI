import { ICommandBarItemProps } from "@fluentui/react";
import Api from "api";
import { useSelector } from "react-redux";
import { UniformTable } from "src/app/common";
import { TableType } from "src/model/enum";
import { RootState } from "src/redux/store";
import { requestAppointmentColumn } from "../components/table/requestAppointmentcolumn";

function ScheduleApproved() {

  const commandBar = () => {
    const command: ICommandBarItemProps[] = [];
    const { tableSelectedCount } = useSelector((state: RootState) => state.currentSelected);
    if(tableSelectedCount !== 0) {
      command.push(
        {
          key: 'start',
          text: 'Bắt đầu',
          iconProps: { iconName: 'Accept' },
          onClick: () => {},
        }
      )
    }
    return command
  }

  return (  
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
          integrateItems={Api.scheduleApi.getListApproveMedical}
          columns={requestAppointmentColumn}
          commandBarItems={commandBar()}  
          tableType={TableType.approveRequestMedical}       
      />
    </div>
  );
}

export default ScheduleApproved;