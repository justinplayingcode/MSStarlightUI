import { appointmentColumn } from "../components/table/appointmentcolumn";
import { useSelector } from "react-redux";
import { DefaultButton, Dialog, DialogFooter, ICommandBarItemProps, PrimaryButton } from "@fluentui/react";
import { useState } from "react";
import { RootState } from "../../../redux/store";
import { UniformTable } from "../../common";
import Api from "../../../api";
import { TableType } from "../../../model/enum";
import { basicKeyValueRender } from "../../../utils/utils";

function AppointmentReportStatic() {
  const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);
  const [closeDialog, setCloseDialog] = useState<boolean>(true);

  const handleCancelAppointment = () => {
    setCloseDialog(true)
  }

  const onDismissDialog = () => {
    setCloseDialog(true)
  }

  const getCommandBar = () => {
    const commandBar: ICommandBarItemProps[] = [];
    if(tableSelectedCount === 1 && tableSelectedItem[0].status === 0) {
      commandBar.push({
        key: "cancel",
        text: "Hủy lịch hẹn",
        iconProps: { iconName: 'RemoveEvent' },
        onClick: () => setCloseDialog(false)
      })
    }
    return commandBar;
  }

  return ( 
    <div className='wrapper-table-content speciality-wrapper'>
        <UniformTable
            integrateItems={Api.scheduleApi.patientGetListScheduleRequest}
            columns={appointmentColumn}
            commandBarItems={getCommandBar()}  
            tableType={TableType.scheduleRequestOfPatient}       
        />
        <Dialog
          dialogContentProps={{ title: "Hủy lịch hẹn khám bệnh"}}
          hidden={closeDialog}
          maxWidth={'480px'}
          minWidth={'360px'}
          modalProps={{ isBlocking: true }}
          onDismiss={onDismissDialog}
        >
          <div>
            <div>
              {basicKeyValueRender("Ngày hẹn", tableSelectedItem[0]?.appointmentDate)}
              {basicKeyValueRender("Với bác sĩ", tableSelectedItem[0]?.doctorName)}
              {basicKeyValueRender("Khoa", tableSelectedItem[0]?.departmentName)}
            </div>
            <DialogFooter>
              <DefaultButton text='Thoát'
                  onClick={() => {
                      onDismissDialog();
                  }}
              />
              <PrimaryButton text='Xác nhận'
                  onClick={() => {
                      handleCancelAppointment();
                  }}
              />
            </DialogFooter>
          </div>
        </Dialog>
    </div>
  );
}

export default AppointmentReportStatic;