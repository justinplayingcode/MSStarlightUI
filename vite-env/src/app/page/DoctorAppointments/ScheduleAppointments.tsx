import { ICommandBarItemProps } from "@fluentui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { tooltipPlainText } from "../../../utils/utils";
import { MappingTypeAppointmentSchedule, TableType } from "../../../model/enum";
import { UniformTable } from "../../common";
import Api from "../../../api";

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

  const coloumn = [
    {
        key: 'fullname',
        name: 'Bệnh nhân',
        minWidth: 120,
        maxWidth: 200,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(item.fullname)}</span>;
        },
    },
    {
        key: 'appointmenttype',
        name: 'Loại lịch hẹn',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(MappingTypeAppointmentSchedule[item.typeAppointment])}</span>;
        },
    },
    {
        key: 'initialSymptom',
        name: 'Lý do',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(item.initialSymptom)}</span>;
        },
    },
    {
        key: 'dateOfBirth',
        name: 'Ngày sinh',
        minWidth: 100,
        maxWidth: 130,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(item.dateOfBirth)}</span>;
        },
    },
    {
        key: 'insurance',
        name: 'Số BHYT',
        minWidth: 100,
        maxWidth: 130,
        isResizable: true,
        onRender: (item: any) => {
          return <span>{tooltipPlainText(item.insurance)}</span>;
        },
    },
    {
        key: 'address',
        name: 'Địa chỉ',
        minWidth: 100,
        maxWidth: 130,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(item.address)}</span>;
        },
    },
    {
        key: 'phonenumber',
        name: 'Số điện thoại',
        minWidth: 100,
        maxWidth: 130,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(item.phonenumber)}</span>;
        },
    },
    {
        key: 'email',
        name: 'Email',
        minWidth: 100,
        maxWidth: 130,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{tooltipPlainText(item.email)}</span>;
        },
    },
  ]

  return (  
    <div className='wrapper-table-content speciality-wrapper'>
      <UniformTable
          integrateItems={Api.scheduleApi.getListApproveMedical}
          columns={coloumn}
          commandBarItems={commandBar()}  
          tableType={TableType.approveRequestMedical}       
      />
    </div>
  );
}

export default ScheduleApproved;