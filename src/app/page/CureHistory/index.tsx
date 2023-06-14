import { Stack } from '@fluentui/react';
import Api from 'api';
import * as React from 'react'
import { useSelector } from 'react-redux';
import { UniformTable } from 'src/app/common';
import { TableType, accountRole } from 'src/model/enum';
import { RootState } from 'src/redux/store';

const CureHistory = () => {
    const { role } = useSelector((state: RootState) => state.user);

    const cureHistoryColumns =[
      {
        key: 'appointmentDate',
        name: 'Ngày khám',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.appointmentDate}</span>;
        },
      },
      {
        key: 'departmentName',
        name: 'Khoa',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.departmentName}</span>;
        },
      },
      {
        key: 'fullname',
        name: role === accountRole.Doctor ? 'Bệnh nhân' : 'Bác sĩ',
        minWidth: 100,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.fullname}</span>;
        },
      },
      {
        key: 'diagnosis',
        name: 'Chuẩn đoán',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.diagnosis}</span>;
        },
      },
      {
        key: 'summary',
        name: 'Kết luận',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item) => {
            return <span>{item?.summary}</span>;
        },
      },
    ];

    const cureHistoryCommanBar = [
        {
            key: 'newItem',
            text: 'Thêm',
            iconProps: { iconName: 'Add' },
            onClick: () => { alert('Lịch sử khám bệnh') },
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




    

   