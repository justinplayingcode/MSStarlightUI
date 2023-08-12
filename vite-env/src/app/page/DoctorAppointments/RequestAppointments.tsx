import { requestAppointmentColumn } from "../components/table/requestAppointmentcolumn";
import ApproveDialog from "./components/ApproveDialog";
import { useState } from "react";
import { ICommandBarItemProps } from "@fluentui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { UniformTable } from "../../common";
import { TableType } from "../../../model/enum";
import Api from "../../../api";

export enum ApproveDialogType {
  accept,
  reject
}

function RequestAppoinments() {
  const [isDialogClosed, setIsDialogClosed] = useState<boolean>(true);
  const [dialogType, setDialogType] = useState<ApproveDialogType>(undefined as any);

  const commandBar = () => {
    const command: ICommandBarItemProps[] = [];
    const { tableSelectedCount } = useSelector((state: RootState) => state.currentSelected);
    if(tableSelectedCount !== 0) {
      command.push(
        {
          key: 'accept',
          text: 'Chấp nhận',
          iconProps: { iconName: 'Accept' },
          onClick: () => {setIsDialogClosed(false); setDialogType(ApproveDialogType.accept)},
        },
        {
          key: 'reject',
          text: 'Từ chối',
          iconProps: { iconName: 'CalculatorMultiply' },
          onClick: () => {setIsDialogClosed(false); setDialogType(ApproveDialogType.reject)},
        }
      )
    }
    return command
  }

  return ( 
    <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
            integrateItems={Api.scheduleApi.requestAppopintmentWait}
            columns={requestAppointmentColumn}
            commandBarItems={commandBar()}  
            tableType={TableType.scheduleRequestWaitApprove}       
        />
        <ApproveDialog
          isDialogClosed={isDialogClosed}
          closeDialog={() => setIsDialogClosed(true)}
          dialogType={dialogType}
        />
    </div>
  );
}

export default RequestAppoinments;