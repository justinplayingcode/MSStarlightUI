import { Stack } from '@fluentui/react';
import Api from 'api';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { MappingTypeAppointmentSchedule, TableType, TypeAppointmentSchedule, accountRole } from 'src/model/enum';
import { RootState } from 'src/redux/store';
import { Convert } from 'utils';

const CureHistory = () => {
    const { role } = useSelector((state: RootState) => state.user);

    const cureHistoryColumns =[
      {
        key: 'appointmentDate',
        name: 'Ngày khám',
        minWidth: 80,
        maxWidth: 120,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.appointmentDate}</span>;
        },
      },
      {
        key: 'departmentName',
        name: 'Khoa',
        minWidth: 70,
        maxWidth: 100,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.departmentName}</span>;
        },
      },
      {
        key: 'type',
        name: 'Loại',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{MappingTypeAppointmentSchedule[item?.typeAppointment]}</span>;
        },
      },
      {
        key: 'fullname',
        name: role === accountRole.Doctor ? 'Bệnh nhân' : 'Bác sĩ',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.fullname}</span>;
        },
      },
      {
        key: 'gender',
        name: 'Giới tính',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{Convert.convertGender(item?.gender)}</span>;
        },
      },
      {
        key: 'dateOfBirth',
        name: 'Ngày sinh',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.dateOfBirth}</span>;
        },
      },
      {
        key: 'address',
        name: 'Địa chỉ',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.address}</span>;
        },
      },
      {
        key: 'insurance',
        name: 'Số BHYT',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.insurance}</span>;
        },
      },
      {
        key: 'phonenumber',
        name: 'Số điện thoại',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.phonenumber}</span>;
        },
      },
    ];

    const cureHistoryCommanBar = [
        {
            key: 'details',
            text: 'Chi tiết',
            iconProps: { iconName: 'ComplianceAudit' },
            onClick: () => { alert('Chi tiết') },
        },
    ]

    const tableType = ():TableType => {
      return role === accountRole.Doctor ? TableType.historyMedicalOfDoctor : TableType.historyMedicalOfPatient
    }

    return(
        <div className='wrapper-table-content'>
            <UniformTable
                columns={cureHistoryColumns}  
                commandBarItems={cureHistoryCommanBar}
                integrateItems={Api.historyMedicalApi.getAllHistoryMedical}
                tableType={tableType()}            
            />
        </div>
    )
}
export default CureHistory;




    

   