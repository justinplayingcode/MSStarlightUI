import * as React from 'react'
import { UniformTable } from 'src/app/common';
import { StartProcessDialog } from '../dialog/StartProcessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { accountRole } from 'model';
import Api from 'src/api'
import { DepartmentType, TableType, toastType } from 'src/model/enum';
import { nonBoardingPatientColumns } from '../../components/table/nonboardingcolumn';
import NormalProgress from '../dialog/NormalProgress';
import ConfirmDialog from '../dialog/Confirm';
import { closeLoading, openLoading, showToastMessage } from 'src/redux/reducers';

const PatientWait = () => {
    const { info, role } = useSelector((state: RootState) => state.user);
    const {tableSelectedCount, tableSelectedItem} = useSelector((state: RootState) => state.currentSelected);
    const dispatch = useDispatch();

    const [isDialogClosed, setDialogClosed] = React.useState<boolean>(true);
    const [isConfirmClosed, setConfirmClosed] = React.useState<boolean>(true);
    const [isStartProgress, setIsStartProgress] = React.useState<boolean>(false);

    const [historyAppointment, setHistoryAppointment] = React.useState<any>(undefined);
    const [testResult, setTestResult] = React.useState<any>([]);
    
    const getNonBoardingPatientCommandBar = () => {
        const commandBar = [];
        if (info?.departmentCode === DepartmentType.tiepDon && role === accountRole.Doctor && tableSelectedCount === 0) {
            commandBar.push({
                key: 'add',
                text: 'Đăng ký khám bệnh',
                iconProps: { iconName: 'Add' },
                onClick: () => { setDialogClosed(false) },
            })
        };
        if(tableSelectedCount === 1 && info?.departmentCode !== DepartmentType.tiepDon && role === accountRole.Doctor){
            commandBar.push({
                key: 'start',
                text: 'Bắt đầu',
                iconProps: { iconName: 'PageHeaderEdit' },
                onClick: () => { 
                    setConfirmClosed(false);
                },
            })
        };
        return commandBar;
    }

    const confirmActionDialog = () => {
      dispatch(openLoading());
      Api.scheduleApi.startScheduleNormal({id: tableSelectedItem[0]?._id}).then(data => {
        if(!data.status) {
          setHistoryAppointment(data.data.history);
          setTestResult(data.data.testResult);
          dispatch(showToastMessage({message: 'Bắt đầu khám bệnh cho bệnh nhân', type: toastType.info}));
          setConfirmClosed(true);
          setIsStartProgress(true);
        } else {
          dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
          setConfirmClosed(true);
        }
      }).catch(() => {
        dispatch(showToastMessage({message: 'Có lỗi xảy ra, hãy thử lại', type: toastType.error}));
        setConfirmClosed(true);
      }).finally(() => dispatch(closeLoading()))
    }

    return(
          <div className='wrapper-table-content speciality-wrapper'>
            <UniformTable
                integrateItems={Api.cureProcessApi.getWaitedPatient}
                columns={nonBoardingPatientColumns}
                commandBarItems={getNonBoardingPatientCommandBar()} 
                tableType={TableType.scheduleNormal}
            />
            <StartProcessDialog 
                isDialogClosed={isDialogClosed} 
                closeDialog={() => {
                    setDialogClosed(true);
                }}             
            />
            <ConfirmDialog
                title="Xác nhận khám cho bệnh nhân"
                isDialogClosed={isConfirmClosed}
                closeDialog={() => {
                    setConfirmClosed(true)
                }}
                confirm={confirmActionDialog}
            />
            <NormalProgress
              isOpen={isStartProgress} 
              onDismiss={() => setIsStartProgress(false)}
              historyAppointment={historyAppointment}
              testresult={testResult}
          />
        </div>
    )
}

export default PatientWait;