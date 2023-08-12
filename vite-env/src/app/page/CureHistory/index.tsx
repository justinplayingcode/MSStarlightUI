import { ICommandBarItemProps } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { Convert } from '../../../utils';
import { accountRole } from '../../../model';
import { showToastMessage } from '../../../redux/reducers';
import Api from '../../../api';
import { MappingTypeAppointmentSchedule, TableType, exportCsvType, toastType } from '../../../model/enum';
import { UniformTable } from '../../common';

const CureHistory = () => {
    const { role } = useSelector((state: RootState) => state.user);
    const { tableSelectedItem, tableSelectedCount } = useSelector((state: RootState) => state.currentSelected);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cureHistoryColumns = [
      {
        key: 'appointmentDate',
        name: 'Ngày khám',
        minWidth: 80,
        maxWidth: 120,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{item?.appointmentDate}</span>;
        },
      },
      {
        key: 'departmentName',
        name: 'Khoa',
        minWidth: 70,
        maxWidth: 100,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{item?.departmentName}</span>;
        },
      },
      {
        key: 'type',
        name: 'Loại',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{MappingTypeAppointmentSchedule[item?.typeAppointment]}</span>;
        },
      },
      {
        key: 'fullname',
        name: role === accountRole.Doctor ? 'Bệnh nhân' : 'Bác sĩ',
        minWidth: 80,
        maxWidth: 150,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{item?.fullname}</span>;
        },
      },
      {
        key: 'email',
        name: 'Email',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{item?.email}</span>;
        },
      },
      {
        key: 'phonenumber',
        name: 'Số điện thoại',
        minWidth: 120,
        maxWidth: 180,
        isResizable: true,
        onRender: (item: any) => {
            return <span>{item?.phonenumber}</span>;
        },
      },
    ];

    if(role === accountRole.Doctor) {
      cureHistoryColumns.push(
        {
          key: 'dateOfBirth',
          name: 'Ngày sinh',
          minWidth: 120,
          maxWidth: 180,
          isResizable: true,
          onRender: (item: any) => {
              return <span>{item?.dateOfBirth}</span>;
          },
        },
        {
          key: 'address',
          name: 'Địa chỉ',
          minWidth: 120,
          maxWidth: 180,
          isResizable: true,
          onRender: (item: any) => {
              return <span>{item?.address}</span>;
          },
        },
        {
          key: 'insurance',
          name: 'Số BHYT',
          minWidth: 120,
          maxWidth: 180,
          isResizable: true,
          onRender: (item: any) => {
              return <span>{item?.insurance}</span>;
          },
        }
      )
    } else if (role === accountRole.Patient) {
      cureHistoryColumns.push(
        {
          key: 'rank',
          name: 'Trình độ',
          minWidth: 120,
          maxWidth: 180,
          isResizable: true,
          onRender: (item: any) => {
              return <span>{Convert.getDoctorRank(item?.rank)}</span>;
          },
        },
        {
          key: 'position',
          name: 'Chức vụ',
          minWidth: 120,
          maxWidth: 180,
          isResizable: true,
          onRender: (item: any) => {
              return <span>{Convert.getDoctorPosition(item?.position)}</span>;
          },
        },
      )
    }

    const cureHistoryCommanBar = (): ICommandBarItemProps[] => {
      const commandBar: ICommandBarItemProps[] = [];
      if(tableSelectedCount > 0) {
        commandBar.push(
            {
              key: 'details',
              text: 'Chi tiết',
              iconProps: { iconName: 'ComplianceAudit' },
              onClick: () => navigate(`/schedulehistory/details/${tableSelectedItem[0]?._id}`),
          }
        )
      }
      if(role === accountRole.Doctor) {
        commandBar.push({
          key: "export",
          text: "Xuất file excel",
          iconProps: { iconName: 'Installation' },
          onClick: handleExportCsv
        })
      }
      return commandBar
    }

    const handleExportCsv = () => {
      dispatch(showToastMessage({message: 'Đang tiến hành tải file, vui lòng chờ trong ít phút', type: toastType.info}));
      Api.statisticApi.exportExcel(exportCsvType.historiesMedical).api.then(response  => {
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

    const tableType = (): TableType => {
      return role === accountRole.Doctor ? TableType.historyMedicalOfDoctor : TableType.historyMedicalOfPatient
    }

    return(
        <div className='wrapper-table-content'>
            <UniformTable
                columns={cureHistoryColumns}  
                commandBarItems={cureHistoryCommanBar()}
                integrateItems={Api.historyMedicalApi.getAllHistoryMedical}
                tableType={tableType()}            
            />
        </div>
    )
}
export default CureHistory;




    

   